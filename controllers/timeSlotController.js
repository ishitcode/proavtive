const db = require('../config/db');

// Add a new time slot for a speaker
const addTimeSlot = async (req, res) => {
  const { speaker_id, slot_time, end_time } = req.body;

  try {
    // Insert the new time slot
    await db.query('INSERT INTO time_slots (speaker_id, slot_time, end_time, is_available, is_booked) VALUES (?, ?, ?, 1, 0)', 
      [speaker_id, slot_time, end_time]);

    res.status(201).json({ message: 'Time slot added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get available time slots for a speaker
const getTimeSlots = async (req, res) => {
  const { speaker_id } = req.params;

  try {
    const [slots] = await db.query('SELECT * FROM time_slots WHERE speaker_id = ? AND is_available = 1 AND is_booked = 0', [speaker_id]);
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addTimeSlot, getTimeSlots };
