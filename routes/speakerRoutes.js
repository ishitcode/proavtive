const express = require('express');
const router = express.Router();
const speakerProfileController = require('../controllers/speakerProfileController');
const { authenticateToken, authorizeSpeaker } = require('../middlewares/authMiddleware');

// Speaker profile creation
router.post('/profile', authenticateToken, authorizeSpeaker, speakerProfileController.addSpeakerProfile);

// Get speaker profile
router.get('/profile/:speaker_id', speakerProfileController.getSpeakerProfile);

module.exports = router;
