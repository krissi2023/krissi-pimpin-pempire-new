# 🎨 Diamondz Playhouse - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          React Frontend (Port 3000)                  │  │
│  │  - Comic Store UI                                    │  │
│  │  - Arcade Game Interface (Phaser.js)                 │  │
│  │  - Stripe Checkout Integration                       │  │
│  │  - User Dashboard                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   Express API Server (Port 5000)             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                          │  │
│  │  - /api/comics (CRUD operations)                     │  │
│  │  - /api/arcade (Game logic, spin, history)          │  │
│  │  - /api/payments (Stripe sessions, intents)         │  │
│  │  - /api/webhooks (Stripe events)                    │  │
│  │  - /api/auth (Login, register, JWT)                 │  │
│  │  - /api/users (Profile, inventory)                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                  Database (MongoDB/PostgreSQL)               │
│  Collections/Tables:                                         │
│  - users (auth, points, profile)                            │
│  - comics (metadata, pricing, themes)                       │
│  - purchases (user transactions)                            │
│  - arcade_games (config, RTP, payouts)                      │
│  - spin_history (game results, wins)                        │
│  - transactions (payment records)                           │
└─────────────────────────────────────────────────────────────┘
                              
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Stripe API                                          │  │
│  │  - Checkout Sessions                                 │  │
│  │  - Payment Intents                                   │  │
│  │  - Webhooks (payment success/fail)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Purchase Flow
```
1. User selects comic in Comic Store
   ↓
2. Frontend calls POST /api/payments/create-checkout-session
   ↓
3. Backend creates Stripe Checkout Session
   ↓
4. User redirected to Stripe Checkout
   ↓
5. User completes payment
   ↓
6. Stripe sends webhook to /api/webhooks/stripe
   ↓
7. Backend verifies webhook signature
   ↓
8. Backend unlocks comic, puzzle, wallpaper
   ↓
9. Backend awards gold points
   ↓
10. User redirected to /success page
```

### Arcade Game Flow
```
1. User clicks "Play" on arcade game
   ↓
2. Frontend loads Phaser.js game
   ↓
3. User places bet and spins
   ↓
4. Frontend generates random result
   ↓
5. Frontend calls POST /api/arcade/spin with result
   ↓
6. Backend validates bet amount
   ↓
7. Backend updates user balance
   ↓
8. Backend records spin in history
   ↓
9. Frontend displays win/loss animation
```

## Security Layers

1. **Authentication**: JWT tokens for user sessions
2. **Payment Security**: Stripe handles all card data (PCI compliant)
3. **Webhook Verification**: Stripe signature validation
4. **CORS**: Restricted to frontend domain only
5. **Environment Variables**: Secrets never in code
6. **HTTPS**: All production traffic encrypted

## Scalability Considerations

- **Caching**: Redis for frequently accessed data
- **CDN**: Static assets (comics, wallpapers) served via CDN
- **Load Balancing**: Multiple API server instances
- **Database Indexing**: On user_id, comic_id, transaction_id
- **Rate Limiting**: Prevent API abuse

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Phaser.js |
| Backend | Node.js, Express |
| Database | MongoDB or PostgreSQL |
| Payments | Stripe API |
| Authentication | JWT |
| Styling | CSS3 with CSS Variables |
| Hosting (Future) | Vercel (FE) + Railway/Render (BE) |

---

**Last Updated**: November 15, 2025
