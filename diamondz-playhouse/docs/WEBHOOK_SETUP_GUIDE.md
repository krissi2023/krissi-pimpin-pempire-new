# 🔔 Webhook Configuration Guide

## Overview
Diamondz Playhouse supports **3 separate webhook endpoints** for different environments, allowing you to test and develop safely without affecting production.

---

## 📍 Available Webhook Endpoints

### 1. **Main Webhook** (Default)
- **Endpoint**: `/api/webhooks/stripe`
- **Environment Variable**: `STRIPE_WEBHOOK_SECRET`
- **Use For**: General development and single-environment setups

### 2. **Development Webhook**
- **Endpoint**: `/api/webhooks/stripe-dev`
- **Environment Variable**: `STRIPE_WEBHOOK_SECRET_DEV`
- **Use For**: Local development, testing new features

### 3. **Testing Webhook**
- **Endpoint**: `/api/webhooks/stripe-test`
- **Environment Variable**: `STRIPE_WEBHOOK_SECRET_TEST`
- **Use For**: Staging environment, QA testing

### 4. **Production Webhook**
- **Endpoint**: `/api/webhooks/stripe-prod`
- **Environment Variable**: `STRIPE_WEBHOOK_SECRET_PROD`
- **Use For**: Live production environment

---

## 🚀 Setup Instructions

### Step 1: Create Webhooks in Stripe Dashboard

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/webhooks
2. **Click "Add endpoint"** (do this 3 times for 3 webhooks)

#### For Each Webhook:

**Development Webhook:**
- URL: `https://your-dev-domain.com/api/webhooks/stripe-dev`
- Description: `Development Environment`
- Events to send:
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
  - `charge.refunded`

**Testing Webhook:**
- URL: `https://your-test-domain.com/api/webhooks/stripe-test`
- Description: `Testing/Staging Environment`
- Same events as above

**Production Webhook:**
- URL: `https://your-production-domain.com/api/webhooks/stripe-prod`
- Description: `Production Environment`
- Same events as above

---

### Step 2: Get Webhook Signing Secrets

After creating each webhook:
1. Click on the webhook in your Stripe dashboard
2. Click **"Reveal"** next to "Signing secret"
3. Copy the secret (starts with `whsec_`)

You'll have 3 secrets like:
- `whsec_abc123...` (dev)
- `whsec_def456...` (test)
- `whsec_ghi789...` (prod)

---

### Step 3: Add Secrets to Environment Variables

#### **Option A: Using .env file (Local Development)**

```env
# Main webhook (can use same as dev for local testing)
STRIPE_WEBHOOK_SECRET=whsec_abc123...

# Development webhook
STRIPE_WEBHOOK_SECRET_DEV=whsec_abc123...

# Testing webhook
STRIPE_WEBHOOK_SECRET_TEST=whsec_def456...

# Production webhook
STRIPE_WEBHOOK_SECRET_PROD=whsec_ghi789...
```

#### **Option B: Using Hosting Platform**

**Vercel:**
```bash
vercel env add STRIPE_WEBHOOK_SECRET_DEV
vercel env add STRIPE_WEBHOOK_SECRET_TEST
vercel env add STRIPE_WEBHOOK_SECRET_PROD
```

**Railway:**
```bash
railway variables set STRIPE_WEBHOOK_SECRET_DEV=whsec_abc123...
railway variables set STRIPE_WEBHOOK_SECRET_TEST=whsec_def456...
railway variables set STRIPE_WEBHOOK_SECRET_PROD=whsec_ghi789...
```

**Heroku:**
```bash
heroku config:set STRIPE_WEBHOOK_SECRET_DEV=whsec_abc123...
heroku config:set STRIPE_WEBHOOK_SECRET_TEST=whsec_def456...
heroku config:set STRIPE_WEBHOOK_SECRET_PROD=whsec_ghi789...
```

---

## 🧪 Testing Webhooks Locally

### Using Stripe CLI (Recommended)

#### 1. Install Stripe CLI
```bash
# Mac
brew install stripe/stripe-cli/stripe

# Windows (using Scoop)
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

#### 2. Authenticate
```bash
stripe login
```

#### 3. Forward Webhooks to Local Server

**For Development Endpoint:**
```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe-dev
```

**For Testing Endpoint:**
```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe-test
```

**For Main Endpoint:**
```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

#### 4. Get Webhook Secret from CLI
When you run `stripe listen`, it will output:
```
> Ready! Your webhook signing secret is whsec_xyz123...
```

Copy this secret and add it to your `.env` file for the corresponding endpoint.

#### 5. Trigger Test Events
```bash
# Test checkout completion
stripe trigger checkout.session.completed

# Test successful payment
stripe trigger payment_intent.succeeded

# Test failed payment
stripe trigger payment_intent.payment_failed

# Test refund
stripe trigger charge.refunded
```

---

## 🔐 Security Best Practices

### 1. **Never Commit Secrets**
Add `.env` to your `.gitignore`:
```gitignore
.env
.env.local
.env.*.local
```

### 2. **Use Different Secrets Per Environment**
- ✅ **DO**: Use unique webhook secrets for dev, test, and prod
- ❌ **DON'T**: Reuse the same secret across environments

### 3. **Rotate Secrets Regularly**
1. Create new webhook in Stripe
2. Update environment variables
3. Delete old webhook after confirming new one works

### 4. **Monitor Webhook Logs**
Check Stripe Dashboard → Webhooks → [Your webhook] → Logs

---

## 📊 Webhook Event Handling

### Events Currently Handled

| Event | Description | Action Taken |
|-------|-------------|--------------|
| `checkout.session.completed` | User completes purchase | Unlock comic, award credits/points |
| `payment_intent.succeeded` | Payment successful | Award points for direct purchases |
| `payment_intent.payment_failed` | Payment failed | Log failure, notify user |
| `charge.refunded` | Refund issued | Revoke access, deduct points |

### Adding More Events

Edit `backend/routes/webhooks.js` and add to the switch statement:

```javascript
case 'customer.subscription.created':
  await handleSubscriptionCreated(event.data.object);
  break;

case 'invoice.payment_succeeded':
  await handleInvoicePayment(event.data.object);
  break;
```

---

## 🐛 Troubleshooting

### Webhook Not Receiving Events
1. **Check webhook URL is publicly accessible**
   ```bash
   curl https://your-domain.com/api/webhooks/stripe-dev
   # Should return: {"error":"Route not found"}
   ```

2. **Verify webhook secret is correct**
   - Check `.env` file matches Stripe dashboard
   - No extra spaces or quotes

3. **Check Stripe logs**
   - Dashboard → Webhooks → [Your webhook] → Attempts
   - Look for 401 or 400 errors

### Signature Verification Failed
```
Error: No signatures found matching the expected signature for payload
```

**Solutions:**
- Ensure you're using `express.raw()` for webhook routes
- Check webhook secret matches exactly
- Verify you're using correct endpoint URL

### Webhook Working Locally But Not in Production
1. **Check HTTPS**: Webhooks require HTTPS in production
2. **Verify environment variables**: Are secrets set on hosting platform?
3. **Check firewall**: Is port accessible?

### Testing Webhook Locally
```bash
# Start your server
npm start

# In another terminal, forward webhooks
stripe listen --forward-to localhost:5000/api/webhooks/stripe-dev

# In another terminal, trigger test event
stripe trigger checkout.session.completed
```

---

## 📝 Example Webhook Payloads

### Checkout Session Completed
```json
{
  "id": "evt_123",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_123",
      "amount_total": 999,
      "currency": "usd",
      "customer": "cus_123",
      "metadata": {
        "comicId": "1",
        "userId": "user_123",
        "type": "comic_purchase"
      },
      "payment_status": "paid"
    }
  }
}
```

### Payment Intent Succeeded
```json
{
  "id": "evt_456",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_123",
      "amount": 999,
      "currency": "usd",
      "status": "succeeded",
      "metadata": {
        "userId": "user_123",
        "type": "points_purchase",
        "pointsAmount": "100"
      }
    }
  }
}
```

---

## 🔄 Webhook Retry Logic

Stripe automatically retries failed webhooks:
- Immediately after failure
- After 5 minutes
- After 1 hour
- After 6 hours
- After 24 hours
- After 72 hours (final attempt)

**To handle retries properly:**
1. Make webhook handlers **idempotent** (safe to call multiple times)
2. Check if action already performed before processing
3. Use event ID to track processed events

```javascript
// Example idempotent handler
async function handleCheckoutSessionCompleted(session) {
  const eventId = session.id;
  
  // Check if already processed
  const existingTransaction = await Transaction.findOne({ eventId });
  if (existingTransaction) {
    console.log(`Event ${eventId} already processed`);
    return;
  }
  
  // Process the event...
  await Transaction.create({ eventId, /* ... */ });
}
```

---

## 🎯 Quick Reference

### Webhook URLs
```
Development:  /api/webhooks/stripe-dev
Testing:      /api/webhooks/stripe-test
Production:   /api/webhooks/stripe-prod
Main:         /api/webhooks/stripe
```

### Environment Variables
```env
STRIPE_WEBHOOK_SECRET          # Main
STRIPE_WEBHOOK_SECRET_DEV      # Development
STRIPE_WEBHOOK_SECRET_TEST     # Testing
STRIPE_WEBHOOK_SECRET_PROD     # Production
```

### Test Commands
```bash
# Forward to dev
stripe listen --forward-to localhost:5000/api/webhooks/stripe-dev

# Trigger event
stripe trigger checkout.session.completed

# View webhook logs
stripe logs tail
```

---

## 📚 Additional Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
- [Testing Webhooks](https://stripe.com/docs/webhooks/test)

---

**You're all set with 3 webhook endpoints!** 🎉

Use the appropriate endpoint for each environment to keep your development, testing, and production data separate and secure.
