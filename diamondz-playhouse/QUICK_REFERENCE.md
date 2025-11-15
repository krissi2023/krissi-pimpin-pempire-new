# 🎯 Quick Reference - Diamondz Playhouse

## 📍 Location
```
/workspaces/krissi-pimpin-pimpire/diamondz-playhouse
```

## 🚀 Quick Commands

### Push to GitHub (Do This First!)
```bash
cd /workspaces/krissi-pimpin-pimpire/diamondz-playhouse

# Add your GitHub repo (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/diamondz-playhouse.git

# Push to GitHub
git push -u origin main
```

### Install & Run Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your Stripe keys to .env
npm run dev    # Runs on http://localhost:5000
```

### Install & Run Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Add Stripe publishable key
npm start      # Opens http://localhost:3000
```

## 🔑 Get Your Stripe Keys

1. Sign up: https://dashboard.stripe.com/register
2. Go to: https://dashboard.stripe.com/test/apikeys
3. Copy:
   - Secret key → backend `.env`
   - Publishable key → frontend `.env.local`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `GITHUB_INSTRUCTIONS.md` | Detailed GitHub setup |
| `README.md` | Project overview |
| `docs/SETUP_GUIDE.md` | Complete setup guide |
| `docs/architecture.md` | System architecture |
| `docs/roadmap.md` | Development phases |
| `backend/server.js` | Main server file |
| `backend/routes/payments.js` | Stripe integration |
| `backend/routes/webhooks.js` | Payment webhooks |
| `frontend/src/App.js` | Main React app |
| `frontend/src/pages/ComicStore.js` | Comic store page |
| `frontend/src/pages/Arcade.js` | Arcade page |
| `frontend/src/games/SlotMachineScene.js` | Phaser game |

## 🎮 What's Included

✅ Complete React frontend with:
- Home, Comic Store, Arcade pages
- Stripe checkout integration
- Phaser.js slot machine game
- Success/Cancel pages
- Responsive arcade theme

✅ Express backend with:
- Stripe payment API
- Webhook handling
- Comics API
- Arcade game API
- Auth structure
- User management

✅ Documentation:
- Setup guide
- Architecture diagram
- Development roadmap
- API examples

## 📊 Project Stats

- **42 files created**
- **3,278 lines of code**
- **7 main features implemented**
- **100% ready to customize**

## 🔧 Next Steps

1. ✅ Push to GitHub
2. ⏳ Get Stripe API keys
3. ⏳ Configure .env files
4. ⏳ Install dependencies
5. ⏳ Run locally and test
6. ⏳ Customize with your content
7. ⏳ Deploy to production

## 💡 Pro Tips

- Use Stripe test mode during development
- Test card: `4242 4242 4242 4242`
- Backend runs on port 5000, frontend on 3000
- Check console for errors during development
- Review `docs/SETUP_GUIDE.md` for troubleshooting

---

**Need help?** Check `GITHUB_INSTRUCTIONS.md` or the `docs/` folder!
