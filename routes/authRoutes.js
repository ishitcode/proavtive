const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// OTP verification route
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
