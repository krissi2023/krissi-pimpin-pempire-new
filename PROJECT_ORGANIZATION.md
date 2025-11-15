# 📁 Project Organization Guide

**Complete directory structure and file organization for Pimpin Paul's Comics x Diamondz Playhouse**

---

## 🗂️ Repository Structure

```
krissi-pimpin-pimpire/
│
├── 📱 diamondz-playhouse/                # Main Application
│   │
│   ├── 🎨 frontend/                      # React Frontend
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── src/
│   │   │   ├── App.js                    # Main app component
│   │   │   ├── App.css
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   │   │
│   │   │   ├── components/               # Reusable components
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Graphics.js           # SVG graphics system
│   │   │   │   ├── GraphicEffects.css    # Animation effects
│   │   │   │   └── ImagePlaceholder.js   # Placeholder components
│   │   │   │
│   │   │   ├── pages/                    # Page components
│   │   │   │   ├── Home.js               # Landing page
│   │   │   │   ├── ComicStore.js         # Browse & buy comics
│   │   │   │   ├── Arcade.js             # Game selection
│   │   │   │   ├── DailyBonus.js         # Daily rewards
│   │   │   │   ├── GraphicsDemo.js       # Graphics showcase
│   │   │   │   ├── Checkout.js           # Payment flow
│   │   │   │   ├── Success.js            # Payment success
│   │   │   │   └── Cancel.js             # Payment cancelled
│   │   │   │
│   │   │   └── games/                    # Game components
│   │   │       ├── SlotMachineGame.js
│   │   │       └── SlotMachineScene.js   # Phaser.js scene
│   │   │
│   │   ├── package.json
│   │   └── .env                          # Frontend config
│   │
│   ├── ⚙️ backend/                       # Node.js Backend
│   │   ├── server.js                     # Express server
│   │   │
│   │   ├── routes/                       # API endpoints
│   │   │   ├── auth.js                   # Authentication
│   │   │   ├── users.js                  # User management
│   │   │   ├── comics.js                 # Comic catalog
│   │   │   ├── payments.js               # Stripe payments
│   │   │   ├── webhooks.js               # Stripe webhooks (4 endpoints)
│   │   │   ├── arcade.js                 # Arcade games
│   │   │   └── rewards.js                # Daily bonuses
│   │   │
│   │   ├── package.json
│   │   └── .env.example                  # Backend config template
│   │
│   ├── 📚 docs/                          # Documentation
│   │   ├── SETUP_GUIDE.md                # Initial setup
│   │   ├── architecture.md               # System architecture
│   │   ├── roadmap.md                    # Development roadmap
│   │   ├── DESIGN_SYSTEM.md              # Brand guidelines
│   │   ├── GRAPHICS_OVERVIEW.md          # Graphics system guide
│   │   ├── GRAPHICS_QUICKSTART.md        # Quick reference
│   │   ├── GRAPHICS_COMPLETE.md          # Full implementation
│   │   ├── ASSET_GUIDE.md                # Asset creation guide
│   │   └── WEBHOOK_SETUP_GUIDE.md        # Stripe webhook setup
│   │
│   ├── 🖼️ assets/                        # Media files
│   │   ├── comics/                       # Comic cover art
│   │   │   ├── rise-cover.jpg
│   │   │   ├── awakening-cover.jpg
│   │   │   ├── revolution-cover.jpg
│   │   │   ├── heist-cover.jpg
│   │   │   └── sparkle-cover.jpg
│   │   │
│   │   ├── puzzles/                      # Puzzle images
│   │   │   ├── rise-puzzle-1.jpg
│   │   │   ├── rise-puzzle-2.jpg
│   │   │   └── [...more...]
│   │   │
│   │   └── wallpapers/                   # Unlockable wallpapers
│   │       ├── rise-wallpaper-1.jpg
│   │       └── [...more...]
│   │
│   ├── QUICK_REFERENCE.md                # Quick dev reference
│   ├── GITHUB_INSTRUCTIONS.md            # GitHub setup
│   └── README.md                         # App-specific README
│
├── 📖 Stories/                           # Comic Content
│   │
│   ├── Comics/                           # Diamondz series
│   │   ├── Part0_Diamondz_First_Sparkle.md
│   │   ├── Part1_The_Rise.md
│   │   ├── Part2_Awakening.md
│   │   └── Part3_Revolution.md
│   │
│   ├── PimpinPaul/                       # Pimpin Paul series
│   │   └── Pimpin_Pauls_Comics_Complete.md
│   │
│   ├── DiamondHeist/                     # Heist series
│   │   ├── Heist_Series_Guide.md
│   │   ├── The_Digital_Diamond_Heist.md
│   │   └── Casino_Vault_Prequel.md
│   │
│   └── Story_Index.md                    # Story catalog
│
├── 🎨 Design/                            # Design Specifications
│   ├── APP_DESIGN_SPECS.md               # Complete UI/UX specs
│   ├── Wireframes/                       # (Future) Wireframe images
│   └── Mockups/                          # (Future) Design mockups
│
├── 💻 SourceCode/                        # Game Implementations
│   │
│   ├── SlotGames/                        # Slot machine variants
│   │   ├── README.md
│   │   ├── ClassicSlots.js
│   │   ├── VideoSlots.js
│   │   ├── ProgressiveJackpotSlots.js
│   │   └── ThemedSlotMachines.js
│   │
│   ├── TableGames/                       # Casino table games
│   │   ├── README.md
│   │   ├── Blackjack.js
│   │   ├── HighOrLow.js
│   │   └── Draw.js
│   │
│   ├── CardGames/                        # Card-based games
│   │   ├── README.md
│   │   └── TexasHoldem.js
│   │
│   ├── QuickGames/                       # Fast mini-games
│   │   ├── README.md
│   │   └── RockPaperScissors.js
│   │
│   ├── BonusGames/                       # Bonus features
│   │   └── README.md
│   │
│   ├── LiveGames/                        # Future live games
│   │   └── README.md
│   │
│   └── FeaturedGame/                     # Featured game system
│       └── README.md
│
├── 🛒 Storefront/                        # E-commerce Components
│   └── DigitalStorefront.js              # Digital product store
│
├── 📄 Root Files                         # Configuration & Info
│   ├── README.md                         # Main project README
│   ├── PROJECT_ORGANIZATION.md           # This file
│   ├── LICENSE                           # Copyright license
│   ├── SECURITY.md                       # Security policy
│   ├── package.json                      # Root dependencies
│   ├── Dockerfile                        # Container config
│   ├── server.js                         # Legacy server (gemini)
│   ├── gemini-service.js                 # AI service
│   ├── DEPLOYMENT.md                     # Deployment guide
│   ├── SSH_SETUP_GUIDE.md                # SSH setup
│   └── QUICK_CLONE_GUIDE.md              # Quick start guide
│
└── .git/                                 # Git repository
```

---

## 📋 File Purpose Guide

### 🎯 Essential Files

**README.md** (Root)
- Primary project documentation
- Overview of entire platform
- Getting started guide
- Feature summary

**diamondz-playhouse/frontend/src/App.js**
- Main React application entry point
- Routing configuration
- Global state management

**diamondz-playhouse/backend/server.js**
- Express API server
- Middleware configuration
- Route mounting

**diamondz-playhouse/backend/routes/webhooks.js**
- Stripe payment webhooks
- 4 environments: main, dev, test, prod
- Payment event handling

---

## 🎨 Content Organization

### Comic Stories
All comic storylines are organized in `/Stories/` by series:
- **Diamondz series**: Origin and early adventures
- **Pimpin Paul series**: Character development and partnerships
- **Diamond Heist series**: Major story arcs

### Design Assets
Design specifications and visual guidelines in `/Design/`:
- Complete UI/UX specs
- Color palettes and typography
- Animation specifications
- Interactive flow documentation

### Game Code
Game implementations in `/SourceCode/` by category:
- Fully functional game classes
- Ready for integration
- Documented with README files

---

## 🔄 Development Workflow

### Adding a New Comic

1. **Create Story File:**
   ```bash
   Stories/Comics/Part[X]_Title.md
   ```

2. **Add Comic Data:**
   ```javascript
   // backend/routes/comics.js
   {
     id: X,
     title: "Comic Title",
     price: 9.99,
     // ... other fields
   }
   ```

3. **Create Assets:**
   ```
   assets/comics/title-cover.jpg
   assets/puzzles/title-puzzle-1.jpg
   assets/wallpapers/title-wallpaper-1.jpg
   ```

### Adding a New Game

1. **Create Game Class:**
   ```bash
   SourceCode/[Category]/GameName.js
   ```

2. **Add Route:**
   ```javascript
   // backend/routes/arcade.js
   router.post('/games/:gameName/play', ...);
   ```

3. **Create Frontend Component:**
   ```bash
   frontend/src/games/GameNameGame.js
   ```

---

## 🚀 Deployment Structure

### Backend (.env)
```env
PORT=5000
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_WEBHOOK_SECRET_DEV=...
STRIPE_WEBHOOK_SECRET_TEST=...
STRIPE_WEBHOOK_SECRET_PROD=...
DATABASE_URL=...
JWT_SECRET=...
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=...
```

---

## 📊 Content Inventory

### Comics Available (5 Total)
1. **Part 1: The Rise** - $9.99
2. **Part 2: Awakening** - $12.99
3. **Part 3: Revolution** - $9.99
4. **The Digital Diamond Heist** - $9.99
5. **Part 0: Diamondz First Sparkle** - $9.99

### Games Implemented
- **Slot Machines**: Classic, Video, Progressive, Themed
- **Table Games**: Blackjack, High or Low, Draw
- **Card Games**: Texas Hold'em
- **Quick Games**: Rock Paper Scissors

### Documentation Files (15+)
- Architecture guides
- Setup instructions
- API documentation
- Design system specs
- Webhook configuration
- Graphics system guides

---

## 🔐 Security & Configuration

### Protected Files (Not in Git)
- `.env` files (frontend & backend)
- `node_modules/`
- Build artifacts (`build/`, `dist/`)
- User data and databases
- API keys and secrets

### Public Files (In Git)
- Source code
- Documentation
- Story content
- Design specifications
- Configuration templates (`.env.example`)

---

## 📈 Project Stats

- **Total Directories:** 30+
- **Total Files:** 70+
- **Lines of Code:** 10,000+
- **Documentation Pages:** 15+
- **Comic Issues:** 5
- **Game Implementations:** 8+
- **API Endpoints:** 20+

---

## 🎯 Next Steps

### Immediate (Phase 2)
- [ ] Create actual comic cover art (600×900px)
- [ ] Design puzzle images from comic panels
- [ ] Create wallpaper artwork (1080×1920px)
- [ ] Implement database schema
- [ ] Add user authentication

### Short-term (Phase 3)
- [ ] Integrate Phaser.js games
- [ ] Build credit/wallet system
- [ ] Add daily bonus mechanics
- [ ] Create leaderboards

### Long-term (Phase 4-5)
- [ ] Mobile app development
- [ ] Advanced animations
- [ ] Beta testing program
- [ ] Production launch

---

## 📞 Quick Reference

**Start Backend:**
```bash
cd diamondz-playhouse/backend && npm start
```

**Start Frontend:**
```bash
cd diamondz-playhouse/frontend && npm start
```

**View App:**
```
http://localhost:3000
```

**API Base:**
```
http://localhost:5000/api
```

---

**Last Updated:** January 2025  
**Maintained By:** Krissi  
**Project Status:** Active Development (Phase 2)
