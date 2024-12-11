const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createCalendarEvent = async (start_time, end_time, summary, description, speakerEmail, userEmail) => {
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: start_time,
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: end_time,
        timeZone: 'America/New_York'
      },
      attendees: [
        { email: speakerEmail },
        { email: userEmail }
      ]
    };

    const eventResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    console.log('Calendar event created:', eventResponse.data.htmlLink);
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
  }
};

module.exports = createCalendarEvent;
