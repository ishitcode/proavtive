const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Booking a session
router.post('/book', authenticateToken, bookingController.bookSession);

module.exports = router;
