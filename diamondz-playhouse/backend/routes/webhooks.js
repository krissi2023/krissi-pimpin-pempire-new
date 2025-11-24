const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Comic = require('../models/Comic');
const Transaction = require('../models/Transaction');

/**
 * Webhook handler factory - creates handler for different environments
 */
function createWebhookHandler(webhookSecretEnvVar) {
  return async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env[webhookSecretEnvVar];

    if (!webhookSecret) {
      console.error(`❌ Webhook secret not configured: ${webhookSecretEnvVar}`);
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(event.data.object);
          break;

        case 'payment_intent.succeeded':
          await handlePaymentIntentSucceeded(event.data.object);
          break;

        case 'payment_intent.payment_failed':
          await handlePaymentIntentFailed(event.data.object);
          break;

        case 'charge.refunded':
          await handleChargeRefunded(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  };
}

/**
 * @route   POST /api/webhooks/stripe
 * @desc    Main Stripe webhook (uses STRIPE_WEBHOOK_SECRET)
 * @access  Public (Stripe)
 */
router.post('/stripe', createWebhookHandler('STRIPE_WEBHOOK_SECRET'));

/**
 * @route   POST /api/webhooks/stripe-dev
 * @desc    Development webhook endpoint
 * @access  Public (Stripe)
 */
router.post('/stripe-dev', createWebhookHandler('STRIPE_WEBHOOK_SECRET_DEV'));

/**
 * @route   POST /api/webhooks/stripe-test
 * @desc    Testing webhook endpoint
 * @access  Public (Stripe)
 */
router.post('/stripe-test', createWebhookHandler('STRIPE_WEBHOOK_SECRET_TEST'));

/**
 * @route   POST /api/webhooks/stripe-prod
 * @desc    Production webhook endpoint
 * @access  Public (Stripe)
 */
router.post('/stripe-prod', createWebhookHandler('STRIPE_WEBHOOK_SECRET_PROD'));

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session) {
  console.log('💳 Checkout session completed:', session.id);

  const { comicId, userId, type } = session.metadata;

  if (type === 'comic_purchase') {
    try {
      // Get comic details
      const comic = await Comic.findOne({ comicId });
      if (!comic) {
        console.error(`❌ Comic ${comicId} not found in database`);
        return;
      }

      // Get user
      const user = await User.findById(userId);
      if (!user) {
        console.error(`❌ User ${userId} not found`);
        return;
      }

      // Check if already purchased
      if (user.ownsComic(comicId)) {
        console.log(`⚠️ User ${userId} already owns comic ${comicId}`);
        return;
      }

      // Award rewards from comic data
      const rewards = {
        goldPoints: comic.goldPointsReward,
        arcadeCredits: comic.arcadeCredits,
        pbPoints: comic.pbPoints
      };

      // Update user with purchase and rewards
      await user.purchaseComic(comicId, rewards);

      // Unlock puzzles and wallpapers
      const puzzles = Array.from({ length: comic.puzzlesCount }, (_, i) => ({
        puzzleId: `${comicId}-puzzle-${i + 1}`
      }));
      
      const wallpapers = Array.from({ length: comic.wallpapersCount }, (_, i) => ({
        wallpaperId: `${comicId}-wp-${i + 1}`
      }));

      user.unlockedPuzzles.push(...puzzles);
      user.unlockedWallpapers.push(...wallpapers);
      await user.save();

      // Update comic purchase count
      comic.purchaseCount += 1;
      await comic.save();

      // Log transaction
      await Transaction.create({
        userId: user._id,
        type: 'comic_purchase',
        comicId,
        amount: session.amount_total / 100,
        stripeSessionId: session.id,
        rewards,
        status: 'completed'
      });

      console.log(`✅ Comic ${comicId} unlocked for user ${userId}`);
      console.log(`🎁 Awarded rewards to user ${userId}:`);
      console.log(`   - ${rewards.goldPoints} Gold Points`);
      console.log(`   - ${rewards.arcadeCredits} Arcade Credits ($${(rewards.arcadeCredits / 100).toFixed(2)} value)`);
      console.log(`   - ${rewards.pbPoints} PB Points`);
      console.log(`   - ${comic.puzzlesCount} Puzzles unlocked`);
      console.log(`   - ${comic.wallpapersCount} Wallpapers unlocked`);
      
    } catch (error) {
      console.error('Error processing comic purchase:', error);
      
      // Log failed transaction
      await Transaction.create({
        userId,
        type: 'comic_purchase',
        comicId,
        amount: session.amount_total / 100,
        stripeSessionId: session.id,
        status: 'failed',
        metadata: { error: error.message }
      });
    }
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('💰 Payment intent succeeded:', paymentIntent.id);

  const metadata = paymentIntent.metadata || {};
  const { type } = metadata;

  if (type !== 'points_purchase') {
    return;
  }

  try {
    const creditsFromMetadata = parseInt(metadata.creditsAmount, 10);
    const creditsFallback = paymentIntent.amount_received || paymentIntent.amount;
    const creditsAmount = Number.isNaN(creditsFromMetadata)
      ? creditsFallback
      : creditsFromMetadata;

    const transaction = await Transaction.findOne({ stripePaymentIntentId: paymentIntent.id });

    let userId = metadata.userId;
    if (transaction && transaction.userId) {
      userId = transaction.userId.toString();
    }

    if (!userId) {
      console.error(`❌ Missing userId for payment intent ${paymentIntent.id}`);
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error(`❌ User ${userId} not found for payment intent ${paymentIntent.id}`);
      return;
    }

    const creditsInCents = parseInt(creditsAmount, 10);
    if (Number.isNaN(creditsInCents) || creditsInCents <= 0) {
      console.error(`❌ Invalid credits amount for payment intent ${paymentIntent.id}`);
      return;
    }

    user.arcadeCredits += creditsInCents;
    await user.save();

    const amountDollars = (paymentIntent.amount_received || paymentIntent.amount) / 100;

    if (transaction) {
      transaction.amount = amountDollars;
      transaction.status = 'completed';
      transaction.rewards = {
        arcadeCredits: creditsInCents
      };
      transaction.metadata = {
        ...(transaction.metadata || {}),
        creditsAmount: creditsInCents,
        currency: paymentIntent.currency,
        paymentMethodTypes: paymentIntent.payment_method_types
      };
      await transaction.save();
    } else {
      await Transaction.create({
        userId: user._id,
        type: 'points_purchase',
        amount: amountDollars,
        stripePaymentIntentId: paymentIntent.id,
        rewards: {
          arcadeCredits: creditsInCents
        },
        status: 'completed',
        metadata: {
          creditsAmount: creditsInCents,
          currency: paymentIntent.currency,
          paymentMethodTypes: paymentIntent.payment_method_types
        }
      });
    }

    console.log(`🪙 Added ${(creditsInCents / 100).toFixed(2)} arcade credits to user ${user._id}`);
  } catch (error) {
    console.error('Error processing points purchase:', error);
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent) {
  console.log('❌ Payment intent failed:', paymentIntent.id);

  const metadata = paymentIntent.metadata || {};

  try {
    const transaction = await Transaction.findOne({ stripePaymentIntentId: paymentIntent.id });

    if (transaction) {
      transaction.status = 'failed';
      transaction.metadata = {
        ...(transaction.metadata || {}),
        error: paymentIntent.last_payment_error?.message,
        failureCode: paymentIntent.last_payment_error?.code
      };
      await transaction.save();
      console.log(`⚠️ Updated transaction ${transaction._id} as failed`);
      return;
    }

    const userId = metadata.userId;
    if (!userId) {
      console.error(`⚠️ Failed payment intent ${paymentIntent.id} missing user reference`);
      return;
    }

    await Transaction.create({
      userId,
      type: 'points_purchase',
      amount: paymentIntent.amount / 100,
      stripePaymentIntentId: paymentIntent.id,
      status: 'failed',
      metadata: {
        error: paymentIntent.last_payment_error?.message,
        failureCode: paymentIntent.last_payment_error?.code
      }
    });

    console.log(`⚠️ Logged failed payment for user ${userId}`);
  } catch (error) {
    console.error('Error logging failed payment intent:', error);
  }
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge) {
  console.log('💸 Charge refunded:', charge.id);

  // TODO: Revoke access if full refund, adjust points
  console.log(`🔄 Processing refund for charge ${charge.id}`);
  
  // Example:
  /*
  const transaction = await Transaction.findOne({ chargeId: charge.id });
  if (transaction) {
    await User.findByIdAndUpdate(transaction.userId, {
      $inc: { goldPoints: -transaction.pointsAmount }
    });
    
    transaction.status = 'refunded';
    await transaction.save();
  }
  */
}

module.exports = router;
