# 💎 Diamondz Playhouse

## 🎮 Overview
Diamondz Playhouse is an interactive online platform combining:
- **Comic Store**: Unlock comics, puzzles, and wallpapers tied to your existing story universe
- **Arcade Slot Game Room**: Play themed slot machines matching comic stories
- **Reward System**: Earn gold points and PB (Power Bonus) to access arcade games
- **Secure Payments**: Integrated with Stripe for purchases

---

## 🚀 Features
- ✅ Comic Store with themed puzzles and wallpapers
- ✅ **Arcade Credits System**: Each comic purchase includes $50 in arcade credits!
- ✅ **Multiple Puzzles Per Comic**: 3+ unique puzzles (jigsaw, word search, etc.)
- ✅ **Multiple Wallpapers**: 5+ wallpapers in various resolutions (desktop & mobile)
- ✅ Arcade slot games matching comic themes (Diamondz Playhouse)
- ✅ **Daily Login Bonuses**: Get rewards every day, with 7-day streak bonuses
- ✅ Stripe payment integration with webhooks
- ✅ User profile and reward tracking
- ✅ **Triple Currency System**: Gold Points + PB Points + Arcade Credits
- ✅ Progressive unlocking system (comics unlock arcade access + credits)
- ✅ **Achievement System**: Unlock rewards for milestones

---

## 🛠 Tech Stack
- **Frontend**: React + Phaser.js (for slot game animations)
- **Backend**: Node.js (Express)
- **Database**: MongoDB or PostgreSQL
- **Payment**: Stripe API with Webhooks
- **Game Engine**: Phaser.js for slot mechanics
- **Styling**: CSS3 with arcade/comic book themes

---

## 📂 Project Structure
```
diamondz-playhouse/
├── frontend/              # React application
│   ├── public/
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Comic Store, Arcade, Payment pages
│       ├── games/         # Phaser.js slot game logic
│       └── assets/        # Images, fonts, styles
│
├── backend/               # Node.js Express API
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   ├── models/            # Database schemas
│   ├── middleware/        # Auth, validation
│   └── utils/             # Helper functions
│
├── assets/                # Content files
│   ├── comics/            # Comic cover images (600×900px)
│   ├── puzzles/           # Puzzle images (1200×1200px)
│   ├── wallpapers/        # Downloadable wallpapers (HD to 4K)
│   └── slot-symbols/      # Slot machine symbols (256×256px)
│
├── docs/                  # Documentation
│   ├── architecture.md
│   ├── roadmap.md
│   ├── SETUP_GUIDE.md
│   ├── DESIGN_SYSTEM.md        # 🎨 Brand & design guidelines
│   ├── ASSET_GUIDE.md          # 📸 How to add images
│   ├── GRAPHICS_QUICKSTART.md  # 🚀 Quick reference
│   └── GRAPHICS_OVERVIEW.md    # 📚 Complete graphics docs
│
├── scripts/               # Utility scripts
│   └── generate-placeholders.sh  # Auto-generate placeholder images
│
└── README.md
```

---

## 🎨 Graphics & Design

This project includes a **complete graphics system** with:

- ✅ **Design System**: Brand colors, typography, spacing, animation guidelines
- ✅ **SVG Components**: Logos, icons, animated elements
- ✅ **CSS Effects Library**: Neon glows, comic effects, arcade animations
- ✅ **Placeholder System**: Beautiful placeholders while creating actual artwork
- ✅ **Asset Management**: Complete guide for adding images
- ✅ **Auto-Generator**: Script to create test placeholders

**📚 Graphics Documentation**:
- **Start Here**: [`docs/GRAPHICS_OVERVIEW.md`](docs/GRAPHICS_OVERVIEW.md) - Complete system overview
- **Quick Reference**: [`docs/GRAPHICS_QUICKSTART.md`](docs/GRAPHICS_QUICKSTART.md) - Common tasks & examples
- **Design Guidelines**: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) - Brand standards
- **Adding Images**: [`docs/ASSET_GUIDE.md`](docs/ASSET_GUIDE.md) - Image management

**🚀 Generate Placeholder Graphics**:
```bash
# Install ImageMagick first
sudo apt-get install imagemagick

# Generate all placeholder images
./scripts/generate-placeholders.sh
```

---

## ✅ Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Stripe account
- MongoDB or PostgreSQL

### Installation

1. **Clone the repository** (after pushing to GitHub):
   ```bash
   git clone https://github.com/<your-username>/diamondz-playhouse.git
   cd diamondz-playhouse
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**:
   
   Create `backend/.env`:
   ```env
   PORT=5000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**:
   
   Backend:
   ```bash
   cd backend
   npm start
   ```
   
   Frontend (in separate terminal):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📌 Roadmap

### Phase 1: Comic Store ✅
- [ ] Comic upload system
- [ ] Puzzle integration
- [ ] Wallpaper downloads
- [ ] Point system implementation

### Phase 2: Arcade Slot Game 🎰
- [ ] Themed slot machines (matching comics)
- [ ] Phaser.js game integration
- [ ] Reward distribution system
- [ ] Game state persistence

### Phase 3: Payment Integration 💳
- [ ] Stripe checkout flow
- [ ] Webhook handler for unlocking content
- [ ] Transaction history
- [ ] Refund handling

### Phase 4: User System 👤
- [ ] User authentication (JWT)
- [ ] Profile management
- [ ] Purchase history
- [ ] Leaderboard system

### Phase 5: Deployment 🚀
- [ ] Cloud hosting setup (AWS/Azure/Vercel)
- [ ] CI/CD pipeline
- [ ] Domain setup
- [ ] SSL certificates

---

## 🎮 Game Flow

1. **User arrives** → Browse Comic Store
2. **Purchase comic** → Stripe payment ($9.99-$12.99)
3. **Unlock massive rewards**:
   - 📖 Full comic access
   - 🧩 3+ themed puzzles
   - 🖼️ 5+ HD wallpapers (desktop & mobile)
   - 🎰 **$50 in Arcade Credits**
   - ⭐ 100-150 Gold Points
   - 💎 50-75 PB Points
4. **Complete puzzles** → Earn bonus Gold Points
5. **Access arcade** → Use your $50 credits on themed slot games
6. **Win more rewards** → Multiply your winnings
7. **Daily login** → Claim daily bonuses (up to 300 Gold Points + 1000 Arcade Credits on day 7!)
8. **Build streak** → Unlock achievements and special rewards

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
MIT License

---

## 📧 Contact
For questions or support, reach out to the project maintainer.

---

**Built with ❤️ for comic and arcade game enthusiasts!**
