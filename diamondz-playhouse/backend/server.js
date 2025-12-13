const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diamondz-playhouse')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3001',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (no origin) and common local dev hosts/ports
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Fallback: allow any localhost/127.0.0.1 port during dev to reduce false blocks
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Stripe webhooks need raw body, so parse them before JSON middleware
// Mount the raw parser on the base webhooks path so all webhook endpoints
// under `/api/webhooks` receive the raw body required for Stripe signature
app.use('/api/webhooks', express.raw({ type: 'application/json' }));

// Parse JSON bodies for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/comics', require('./routes/comics'));
app.use('/api/arcade', require('./routes/arcade'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/wallet', require('./routes/wallet'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Diamondz Playhouse API is running' });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Diamondz Playhouse API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
