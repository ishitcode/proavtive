const db = require('../config/db');

// Book a session
const bookSession = async (user_id, speaker_id, time_slot_id, slot_time) => {
  try {
    const [slot] = await db.query('SELECT * FROM time_slots WHERE id = ? AND is_available = 1 AND is_booked = 0', [time_slot_id]);
    if (slot.length === 0) {
      throw new Error('Time slot not available');
    }

    // Mark slot as booked
    await db.query('UPDATE time_slots SET is_booked = 1 WHERE id = ?', [time_slot_id]);

    // Create a session
    await db.query('INSERT INTO sessions (user_id, speaker_id, time_slot) VALUES (?, ?, ?)', [user_id, speaker_id, slot_time]);

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { bookSession };
