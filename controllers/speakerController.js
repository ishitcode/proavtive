const db = require('../config/db');

// Get the list of speakers
const getSpeakerList = async (req, res) => {
  try {
    const [speakers] = await db.query('SELECT * FROM speaker_profiles');
    res.json(speakers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSpeakerList };
