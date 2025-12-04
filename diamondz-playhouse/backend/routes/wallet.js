const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const STRIPE_API_VERSION = process.env.STRIPE_API_VERSION || '2024-06-20';

// Issues an ephemeral key for adding an Issuing card to a digital wallet
router.post('/issuing/ephemeral-key', authMiddleware, async (req, res) => {
  try {
    const { cardId } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const issuingCardId = cardId || user.stripeIssuingCardId || process.env.STRIPE_ISSUING_CARD_ID;
    if (!issuingCardId) {
      return res.status(400).json({ error: 'No issuing card reference available' });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { issuing_card: issuingCardId },
      { stripe_version: STRIPE_API_VERSION }
    );

    res.json({ ephemeralKey });
  } catch (error) {
    console.error('Error creating wallet ephemeral key:', error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
