const db = require('../config/db');

// Add time slot for speaker
const addTimeSlot = async (speaker_id, slot_time, end_time) => {
  try {
    await db.query('INSERT INTO time_slots (speaker_id, slot_time, end_time, is_available, is_booked) VALUES (?, ?, ?, 1, 0)', 
      [speaker_id, slot_time, end_time]);
  } catch (error) {
    throw new Error('Error adding time slot: ' + error.message);
  }
};

// Get available time slots for a speaker
const getAvailableTimeSlots = async (speaker_id) => {
  try {
    const [slots] = await db.query('SELECT * FROM time_slots WHERE speaker_id = ? AND is_available = 1 AND is_booked = 0', [speaker_id]);
    return slots;
  } catch (error) {
    throw new Error('Error fetching time slots: ' + error.message);
  }
};

module.exports = { addTimeSlot, getAvailableTimeSlots };
