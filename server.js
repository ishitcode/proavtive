// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import the database configuration

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your routes
const authRoutes = require('./routes/authRoutes');
const speakerRoutes = require('./routes/speakerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');

app.use('/auth', authRoutes);
app.use('/speaker', speakerRoutes);
app.use('/bookings', bookingRoutes);
app.use('/time-slots', timeSlotRoutes);

// Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release(); // Always release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
