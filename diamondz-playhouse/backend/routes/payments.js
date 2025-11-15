const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * @route   POST /api/payments/create-checkout-session
 * @desc    Create Stripe checkout session for comic purchase
 * @access  Public
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { comicId, comicTitle, price, userId } = req.body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: comicTitle,
              description: 'Includes comic, puzzle, and wallpaper',
              images: ['https://your-domain.com/comic-images/default.jpg'],
            },
            unit_amount: price, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        comicId,
        userId,
        type: 'comic_purchase'
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/payments/create-payment-intent
 * @desc    Create payment intent for arcade points purchase
 * @access  Public
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, userId, pointsAmount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      metadata: {
        userId,
        pointsAmount,
        type: 'points_purchase'
      },
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/payments/session/:sessionId
 * @desc    Retrieve checkout session details
 * @access  Public
 */
router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/payments/refund
 * @desc    Process refund for a payment
 * @access  Private (Admin)
 */
router.post('/refund', async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount, // Optional: partial refund amount in cents
      reason: reason || 'requested_by_customer',
    });

    res.json({ success: true, refund });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
