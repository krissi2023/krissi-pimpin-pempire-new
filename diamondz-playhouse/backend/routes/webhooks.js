const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    // TODO: Implement database logic
    // 1. Mark comic as purchased for user
    // 2. Unlock puzzle and wallpaper
    // 3. Award gold points (e.g., 100 points per comic)
    // 4. Award arcade credits ($50 = 5000 credits)
    // 5. Award PB points (50 PB)
    // 6. Send confirmation email
    
    console.log(`✅ Comic ${comicId} unlocked for user ${userId}`);
    console.log(`🎁 Awarded rewards to user ${userId}:`);
    console.log(`   - 100 Gold Points`);
    console.log(`   - 5000 Arcade Credits ($50 value)`);
    console.log(`   - 50 PB Points`);
    console.log(`   - 3 Puzzles unlocked`);
    console.log(`   - 5 Wallpapers unlocked`);
    
    // Example database update (uncomment when DB is ready):
    /*
    await User.findByIdAndUpdate(userId, {
      $push: { purchasedComics: comicId },
      $inc: { 
        goldPoints: 100,
        arcadeCredits: 5000,  // $50 in arcade credits
        pbPoints: 50
      }
    });
    
    await Comic.findByIdAndUpdate(comicId, {
      $push: { purchasedBy: userId }
    });
    
    // Unlock puzzles and wallpapers
    await User.findByIdAndUpdate(userId, {
      $push: {
        unlockedPuzzles: { $each: [`${comicId}-puzzle-1`, `${comicId}-puzzle-2`, `${comicId}-puzzle-3`] },
        unlockedWallpapers: { $each: [`${comicId}-wp-1`, `${comicId}-wp-2`, `${comicId}-wp-3`, `${comicId}-wp-4`, `${comicId}-wp-5`] }
      }
    });
    
    // Log transaction
    await Transaction.create({
      userId,
      type: 'comic_purchase',
      comicId,
      amount: session.amount_total / 100,
      rewards: {
        goldPoints: 100,
        arcadeCredits: 5000,
        pbPoints: 50
      },
      status: 'completed'
    });
    */
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('💰 Payment intent succeeded:', paymentIntent.id);

  const { userId, pointsAmount, type } = paymentIntent.metadata;

  if (type === 'points_purchase') {
    // TODO: Add points to user account
    console.log(`🪙 Added ${pointsAmount} points to user ${userId}`);
    
    // Example database update:
    /*
    await User.findByIdAndUpdate(userId, {
      $inc: { goldPoints: parseInt(pointsAmount) }
    });
    
    await Transaction.create({
      userId,
      type: 'points_purchase',
      amount: paymentIntent.amount / 100,
      pointsAmount,
      status: 'completed',
      paymentIntentId: paymentIntent.id
    });
    */
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent) {
  console.log('❌ Payment intent failed:', paymentIntent.id);

  const { userId } = paymentIntent.metadata;

  // TODO: Log failed payment, notify user
  console.log(`⚠️ Payment failed for user ${userId}`);
  
  // Example:
  /*
  await Transaction.create({
    userId,
    type: 'payment_failed',
    amount: paymentIntent.amount / 100,
    status: 'failed',
    paymentIntentId: paymentIntent.id,
    error: paymentIntent.last_payment_error?.message
  });
  */
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
