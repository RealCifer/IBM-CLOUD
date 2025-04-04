const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');
const mongoose = require("mongoose");


// Local Register
router.post("/register", async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with a generated _id
      user = await User.create({
          _id: new mongoose.Types.ObjectId().toString(), // Generate string ID
          name,
          email,
          password: hashedPassword,
          provider: "local",
          date: new Date(),
      });

      // Create JWT token
      const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
      );

      res.json({
          token,
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              provider: user.provider,
          },
      });
  } catch (error) {
      console.error("❌ Register Error:", error);
      res.status(500).json({ message: "Server error" });
  }
});

// Local Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is a Google user
    if (user.provider === "google") {
      return res.status(400).json({
        message: "Please use Google Sign-In for this account",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Redirect to dashboard with token
      const redirectUrl = new URL(`${process.env.FRONTEND_URL}`);
      redirectUrl.searchParams.append('token', token);
      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('❌ Google Callback Error:', error);
      res.redirect('/login?error=auth_failed');
    }
  }
);


// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select('-password')
      .lean();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      picture: user.picture,
      given_name: user.given_name,
      family_name: user.family_name
    });
  } catch (error) {
    console.error('❌ Auth Verification Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    req.logout(() => {
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('❌ Logout Error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
});

module.exports = router;