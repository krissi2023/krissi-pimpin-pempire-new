# 💎 Pimpin Paul's Comics x Diamondz Playhouse

**Where Comics Meet Arcade Luxury**

A revolutionary digital platform combining premium comic storytelling with interactive arcade gaming. Purchase comics, solve puzzles, earn credits, and unlock the VIP arcade experience.

---

## 🎯 Project Overview

### Two Brands, One Platform

**🎨 Pimpin Paul's Comics** (Comic Store)
- Tech-noir aesthetic with neon green accents
- Features original comic series starring Pimpin Paul & Diamond
- Embedded interactive puzzles and unlockable wallpapers

**💎 Diamondz Playhouse** (Arcade)
- Luxury VIP nightclub gaming experience
- Gold and neon pink aesthetic
- Unlocked through comic purchases and puzzle completion

---

## 📚 Comic Series

### Diamondz First Sparkle
The Queen B meets her match in this prequel to the Diamond Heist saga. Watch as the world's most stylish jewel thief faces off against a digital detective who speaks only in code.

**Issues:**
1. Plan Alpha: Shine Bright Like a... Target
2. The Double Cross (Digital & Dazzling)
3. The Unexpected Algorithm

### Pimpin Paul's Comics
The origin story of the digital detective and his partnership with the chaotic genius Diamond.

**Issues:**
1. The Origin of the Digital Side-Cake
2. The Code of the Conflicted Pimp
3. The Meta-Heist Mandate
4. The Keystone Koordinates (The Team-Up)

### The Diamond Heist Series
- The Digital Diamond Heist
- Casino Vault Prequel
- And more...

---

## ✨ Key Features

### 💰 Dual Currency System
- **PPC (Pimpin Paul Credits):** Earned from comic purchases, used in arcade
- **Gold Coins:** Bonus currency from puzzles and achievements

### 🧩 Interactive Puzzles
- Jigsaw puzzles from comic art
- Word searches with story themes
- Time bonuses for fast completion
- Rewards: 25-50 Gold Points per puzzle

### 🎮 Arcade Gaming
- Slot machines with comic themes
- Table games (Blackjack, High or Low)
- Quick games (Rock Paper Scissors)
- Daily bonuses and streak rewards

### 🖼️ Bonus Content
- Unlockable wallpapers (5-7 per comic)
- Character bios and concept art
- Behind-the-scenes content
- Exclusive chapters for premium comics

---

## 💵 Pricing & Rewards

### Comic Purchases
| Tier | Price | Gold Points | Arcade Credits | PB Points | Puzzles | Wallpapers |
|------|-------|-------------|----------------|-----------|---------|------------|
| Standard | $9.99 | 100 | 5,000 | 50 | 3 | 5 |
| Premium | $12.99 | 150 | 6,500 | 75 | 4 | 7 |

### Value Proposition
- **$9.99 comic** = $50 in arcade credits + puzzles + wallpapers
- **500% value** on every purchase!

---

## 🎨 Design System

### Color Palette

**Pimpin Paul's Theme:**
- Neon Green: `#00FF41`
- Matrix Green: `#0D0`
- Deep Black: `#000000`

**Diamondz Playhouse Theme:**
- Gold: `#FFD700`
- Neon Pink: `#FF1493`
- Electric Blue: `#007BFF`

### Typography
- **Headlines:** Graffiti-inspired (Urban Jungle)
- **Elegant Text:** Serif (Playfair Display)
- **Body:** Sans-serif (Roboto, Montserrat)

### Visual Style
- Urban-classy aesthetic
- Neon glow effects
- Metallic gradients
- Sleek car silhouettes for Diamondz branding

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/krissi2023/krissi-pimpin-pimpire.git
cd krissi-pimpin-pimpire

# Install backend dependencies
cd diamondz-playhouse/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start backend
cd ../backend
npm start

# Start frontend (in new terminal)
cd ../frontend
npm start
```

### Environment Variables

**Backend (.env):**
```env
PORT=5000
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_WEBHOOK_SECRET_DEV=dev_webhook_secret
STRIPE_WEBHOOK_SECRET_TEST=test_webhook_secret
STRIPE_WEBHOOK_SECRET_PROD=prod_webhook_secret
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 📂 Repository Structure

```
krissi-pimpin-pimpire/
├── diamondz-playhouse/          # Main app
│   ├── frontend/                # React app
│   ├── backend/                 # Node.js API
│   ├── docs/                    # Documentation
│   └── assets/                  # Graphics & media
│
├── Stories/                     # Comic content
│   ├── Comics/                  # Diamondz series
│   ├── PimpinPaul/             # Pimpin Paul series
│   └── DiamondHeist/           # Heist series
│
├── Design/                      # UI/UX specifications
│   └── APP_DESIGN_SPECS.md
│
├── SourceCode/                  # Game implementations
│   ├── SlotGames/
│   ├── TableGames/
│   └── QuickGames/
│
└── Storefront/                  # E-commerce components
```

---

## 📖 Documentation

- **[Graphics Overview](diamondz-playhouse/docs/GRAPHICS_OVERVIEW.md)** - Complete graphics system
- **[Graphics Quick Start](diamondz-playhouse/docs/GRAPHICS_QUICKSTART.md)** - Quick reference guide
- **[Asset Guide](diamondz-playhouse/docs/ASSET_GUIDE.md)** - How to add your own graphics
- **[Design System](diamondz-playhouse/docs/DESIGN_SYSTEM.md)** - Brand guidelines
- **[Webhook Setup](diamondz-playhouse/docs/WEBHOOK_SETUP_GUIDE.md)** - Stripe webhook configuration
- **[App Design Specs](Design/APP_DESIGN_SPECS.md)** - Complete UI/UX specifications

---

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project structure setup
- [x] Backend API development
- [x] Frontend React app
- [x] Graphics system
- [x] Design system documentation

### Phase 2: Core Features 🚧
- [ ] User authentication
- [ ] Comic purchase flow
- [ ] Stripe payment integration
- [ ] Puzzle mini-games
- [ ] Wallet system

### Phase 3: Arcade 📋
- [ ] Arcade game integration
- [ ] Credit system
- [ ] Daily bonuses
- [ ] Leaderboards

### Phase 4: Polish 📋
- [ ] Animations and transitions
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Beta testing

### Phase 5: Launch 🚀
- [ ] Production deployment
- [ ] Marketing materials
- [ ] App store submissions
- [ ] Public release

---

## 👥 Characters & Credits

### Created By
**Krissi** - Creator, Writer, Designer

### Main Characters
- **Diamond (The Queen B)** - Master jewel thief, apex predator
- **Pimpin Paul** - Digital detective, code genius
- **Yagi** - AI assistant, sass provider

---

## 📜 License

Copyright © 2025 Krissi. All rights reserved.

This project and all associated content (comics, characters, designs) are proprietary and protected by copyright law.

---

## 📞 Contact

**Project Owner:** Krissi  
**Repository:** [github.com/krissi2023/krissi-pimpin-pimpire](https://github.com/krissi2023/krissi-pimpin-pimpire)

---

**Built with 💎 and ⚡ by Krissi**

*Where Comics Meet Arcade Luxury*
