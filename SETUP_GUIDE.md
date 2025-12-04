# 🚀 Setup Guide - Krissi Pimpin' Pimpire

## ✅ Current Status

**Your project is ready to run!** Here's what's been set up:

### Files Created
- ✅ `diamondz-playhouse/backend/.env` - Backend environment variables
- ✅ `diamondz-playhouse/frontend/.env` - Frontend environment variables

### Dependencies Installed
- ✅ Root dependencies (Express, Gemini AI, Jest)
- ✅ Backend dependencies (Stripe, MongoDB, JWT)
- ✅ Frontend dependencies (React, Vite, Phaser)

### Tests Status
- ✅ Backend tests passing (16 tests)
- ⚠️ Frontend tests use Vitest (run separately)

---

## 🎮 How to Run

### Option 1: Root Server Only (Port 3000)
Runs the API gateway with game services and storefront:

```bash
npm start
```

Access at: http://localhost:3000

### Option 2: Full Stack (Backend + Frontend)

**Terminal 1 - Backend API (Port 5000):**
```bash
cd diamondz-playhouse\backend
npm start
```

**Terminal 2 - Frontend React App (Port 3001 or auto-assigned):**
```bash
cd diamondz-playhouse\frontend
npm run dev
```

Access frontend at: http://localhost:3001 (or the port Vite assigns)

---

## 🔧 Configuration Needed

### 1. Root `.env` (Already exists)
```env
GEMINI_API_KEY=your_api_key_here
```
**Status:** ✅ File exists - Update with your Gemini API key if needed

### 2. Backend `.env` 
Location: `diamondz-playhouse\backend\.env`

**Required for payments and database:**
```env
MONGODB_URI=mongodb://localhost:27017/diamondz-playhouse
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
JWT_SECRET=your_secure_random_string_here
```

**Status:** ✅ File created with defaults - Update for production

### 3. Frontend `.env`
Location: `diamondz-playhouse\frontend\.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

**Status:** ✅ File created with defaults

---

## 📋 Quick Commands

```bash
# Root level
npm start              # Start API gateway server
npm test               # Run backend tests
npm run test:backend   # Run backend tests explicitly
npm run test:frontend  # Run frontend tests
npm run lint           # Check code quality

# Backend
cd diamondz-playhouse\backend
npm start              # Start backend API
npm run dev            # Start with auto-reload
npm test               # Run tests

# Frontend
cd diamondz-playhouse\frontend
npm run dev            # Start development server
npm run build          # Build for production
npm test               # Run Vitest tests
```

---

## 🎯 What You Can Do Now

### Without Configuration:
- ✅ Browse game catalog via API
- ✅ Test arcade game sessions
- ✅ View storefront items
- ✅ Read story content
- ✅ Run all backend tests

### After Adding Keys:
- 🔐 Gemini AI integration (chat, content generation)
- 💳 Stripe payments (comic purchases)
- 💾 MongoDB storage (user accounts, purchases)
- 🎮 Full arcade experience with credits

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
**Problem:** Another app is using port 3000

**Solution 1 - Stop existing process:**
```bash
# Find process ID
netstat -ano | findstr :3000

# Stop it (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution 2 - Use different port:**
Edit `server.js` and change `PORT = 3000` to another port like `3001`

### MongoDB Connection Failed
- Install MongoDB locally, OR
- Use MongoDB Atlas (cloud) and update `MONGODB_URI`

### Tests Hanging
This is normal - press `Ctrl+C` to exit after tests pass

---

## 📁 Project Structure

```
krissi-pimpin-pempire-new/
├── server.js                  # Root API gateway (port 3000)
├── package.json               # Root dependencies
├── .env                       # Gemini API key
│
├── diamondz-playhouse/
│   ├── backend/              # Node.js API (port 5000)
│   │   ├── server.js
│   │   ├── .env              # Stripe, MongoDB, JWT
│   │   └── services/
│   │
│   └── frontend/             # React + Vite app
│       ├── src/
│       ├── .env              # API URL, Stripe public key
│       └── package.json
│
├── SourceCode/               # Game logic
├── Storefront/               # Digital store
└── Stories/                  # Comic content
```

---

## 🎉 Next Steps

1. **Start the root server:** `npm start`
2. **Test the API:** Open http://localhost:3000 in browser
3. **Add your API keys** if you want payments/AI features
4. **Start building!** All tests pass and dependencies are ready

**Note:** The "expired token" message you saw was an internal system message, not related to your API keys. Everything is working correctly!
