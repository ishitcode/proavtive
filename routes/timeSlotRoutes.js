const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');
const { authenticateToken, authorizeSpeaker } = require('../middlewares/authMiddleware');

// Add time slot
router.post('/add', authenticateToken, authorizeSpeaker, timeSlotController.addTimeSlot);

// Get available time slots for a speaker
router.get('/:speaker_id', timeSlotController.getTimeSlots);

module.exports = router;
