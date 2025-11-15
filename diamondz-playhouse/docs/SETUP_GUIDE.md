# 🚀 Setup Guide for Diamondz Playhouse

Follow these steps to get your project running locally and push it to GitHub.

## Step 1: Install Dependencies

### Backend Setup
```bash
cd diamondz-playhouse/backend
npm install
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

## Step 2: Configure Environment Variables

### Backend Configuration
1. Copy the example env file:
```bash
cd backend
cp .env.example .env
```

2. Edit `.env` and add your keys:
- Get Stripe keys from https://dashboard.stripe.com/test/apikeys
- Set a strong JWT secret
- Configure your database URL

### Frontend Configuration
1. Copy the example env file:
```bash
cd frontend
cp .env.example .env.local
```

2. Edit `.env.local` and add:
- Your Stripe publishable key
- Backend API URL (default: http://localhost:5000/api)

## Step 3: Run the Application

### Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend (in new terminal)
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

## Step 4: Test Stripe Integration

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any ZIP code

## Step 5: Set Up Webhooks (for development)

### Using Stripe CLI
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:5000/api/webhooks/stripe

# Copy the webhook signing secret to your .env file
```

## Step 6: Push to GitHub

### Initialize Git Repository
```bash
cd diamondz-playhouse
git init
git add .
git commit -m "Initial commit: Diamondz Playhouse setup"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `diamondz-playhouse`
3. Make it public or private
4. **Don't** initialize with README (we already have one)
5. Click "Create repository"

### Connect and Push
```bash
# Replace <your-username> with your GitHub username
git remote add origin https://github.com/<your-username>/diamondz-playhouse.git
git branch -M main
git push -u origin main
```

## Step 7: Optional - Set Up Database

### MongoDB (Recommended)
```bash
# Install MongoDB locally or use MongoDB Atlas (cloud)
# Update DATABASE_URL in backend/.env
```

### PostgreSQL Alternative
```bash
# Install PostgreSQL
# Update DATABASE_URL in backend/.env
# Install pg package: npm install pg
```

## 🎉 You're All Set!

Your application should now be:
- ✅ Running locally on http://localhost:3000
- ✅ Connected to Stripe for payments
- ✅ Ready to push to GitHub

## Next Steps

1. **Customize Comics**: Add your actual comic data in `backend/routes/comics.js`
2. **Add Assets**: Place comic covers, puzzles, and wallpapers in `assets/` folder
3. **Implement Database**: Connect MongoDB/PostgreSQL and create schemas
4. **Deploy**: Use Vercel (frontend) + Render/Railway (backend)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Stripe Webhooks Not Working
- Check webhook secret in `.env`
- Make sure Stripe CLI is running
- Verify endpoint in Stripe dashboard

## Need Help?

- Check the README.md for more information
- Review docs/roadmap.md for development plan
- Test with Stripe test mode before going live
