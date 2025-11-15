const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // TODO: 
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Create user in database
    // 5. Generate JWT token

    res.json({ 
      success: true,
      message: 'User registered successfully',
      userId: 'user_123',
      token: 'jwt_token_here'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO:
    // 1. Validate input
    // 2. Find user
    // 3. Compare password
    // 4. Generate JWT token

    res.json({
      success: true,
      userId: 'user_123',
      username: 'DemoUser',
      token: 'jwt_token_here',
      goldPoints: 500,
      pbPoints: 100
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
