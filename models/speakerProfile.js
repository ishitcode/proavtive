const db = require('../config/db');

// Create a new speaker profile
const createSpeakerProfile = async (speaker_id, expertise, price_per_session) => {
  try {
    await db.query('INSERT INTO speaker_profiles (speaker_id, expertise, price_per_session) VALUES (?, ?, ?)', 
      [speaker_id, expertise, price_per_session]);
  } catch (error) {
    throw new Error('Error creating speaker profile: ' + error.message);
  }
};

// Get speaker profile details
const getSpeakerProfile = async (speaker_id) => {
  try {
    const [profile] = await db.query('SELECT * FROM speaker_profiles WHERE speaker_id = ?', [speaker_id]);
    return profile[0];
  } catch (error) {
    throw new Error('Error fetching speaker profile: ' + error.message);
  }
};

module.exports = { createSpeakerProfile, getSpeakerProfile };
