const db = require('../config/db');

// Add speaker profile
const addSpeakerProfile = async (req, res) => {
  const { expertise, price_per_session } = req.body;
  const speaker_id = req.user.userId;

  try {
    // Check if speaker profile already exists
    const [existingProfile] = await db.query('SELECT * FROM speaker_profiles WHERE speaker_id = ?', [speaker_id]);
    if (existingProfile.length > 0) {
      return res.status(400).json({ message: 'Speaker profile already exists' });
    }

    // Create new speaker profile
    await db.query('INSERT INTO speaker_profiles (speaker_id, expertise, price_per_session) VALUES (?, ?, ?)', 
      [speaker_id, expertise, price_per_session]);

    res.status(201).json({ message: 'Speaker profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get speaker profile
const getSpeakerProfile = async (req, res) => {
  const speaker_id = req.params.speaker_id;

  try {
    const [profile] = await db.query('SELECT * FROM speaker_profiles WHERE speaker_id = ?', [speaker_id]);
    if (profile.length === 0) {
      return res.status(404).json({ message: 'Speaker profile not found' });
    }
    res.json(profile[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addSpeakerProfile, getSpeakerProfile };
