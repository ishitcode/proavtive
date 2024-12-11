const db = require('../config/db');

// Get user email
const getUserEmail = async (user_id) => {
  try {
    const [result] = await db.query('SELECT email FROM users WHERE id = ?', [user_id]);
    return result[0]?.email;
  } catch (error) {
    throw new Error('Error fetching user email: ' + error.message);
  }
};

module.exports = { getUserEmail };
