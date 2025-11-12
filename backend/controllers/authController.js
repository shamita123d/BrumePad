const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'default_secret', // use .env in production
      { expiresIn: '7d' }
    );

    // Send response
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
