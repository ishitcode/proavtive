const db = require('../config/db');
const sendEmail = require('../services/emailService');
const createCalendarEvent = require('../services/googleCalendarService');

// Booking a session
const bookSession = async (req, res) => {
  const { speaker_id, time_slot_id } = req.body;
  const user_id = req.user.userId;

  try {
    // Check if the time slot is available
    const [slot] = await db.query('SELECT * FROM time_slots WHERE id = ? AND is_available = 1 AND is_booked = 0', [time_slot_id]);
    if (slot.length === 0) {
      return res.status(400).json({ message: 'Time slot not available or already booked' });
    }

    // Book the session by marking the slot as booked
    await db.query('UPDATE time_slots SET is_booked = 1 WHERE id = ?', [time_slot_id]);

    // Create a session record
    const [sessionResult] = await db.query('INSERT INTO sessions (user_id, speaker_id, time_slot) VALUES (?, ?, ?)', 
      [user_id, speaker_id, slot[0].slot_time]);

    // Send email notifications to user and speaker
    const speakerEmail = await getSpeakerEmail(speaker_id);
    const userEmail = await getUserEmail(user_id);
    await sendEmail(speakerEmail, 'New Session Booking', `You have a new session booking at ${slot[0].slot_time}`);
    await sendEmail(userEmail, 'Session Booking Confirmation', `Your session with the speaker is booked at ${slot[0].slot_time}`);

    // Create Google Calendar event
    await createCalendarEvent(slot[0].slot_time, slot[0].end_time, 'Session Booking', 'Scheduled session with speaker', speakerEmail, userEmail);

    res.status(201).json({ message: 'Session booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Helper function to get speaker's email
const getSpeakerEmail = async (speaker_id) => {
  const [result] = await db.query('SELECT email FROM users WHERE id = ?', [speaker_id]);
  return result[0]?.email;
};

// Helper function to get user's email
const getUserEmail = async (user_id) => {
  const [result] = await db.query('SELECT email FROM users WHERE id = ?', [user_id]);
  return result[0]?.email;
};

module.exports = { bookSession };
