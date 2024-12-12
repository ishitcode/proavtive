A robust Speaker Booking System built with Node.js, Express, MySQL, and JWT for authentication. This platform enables users to create profiles, book speakers, manage speaker sessions, and handle authentication securely.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

---

## Features

1. **User Authentication:**
   - Signup/Login with JWT-based authentication.
   - OTP verification for new users.

2. **Role Management:**
   - Distinguish between regular users and speakers.

3. **Speaker Profiles:**
   - Creation and management of speaker profiles.
   - Expertise and pricing details.

4. **Booking System:**
   - Users can book sessions with speakers.

5. **Protected Endpoints:**
   - Secure APIs with role-based access control.

6. **Database Integration:**
   - Seamlessly integrates with MySQL for data storage.

## Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **Other Libraries:** Bcrypt, MySQL2, Dotenv

## Installation

### Prerequisites

- Node.js (v22.12.0 or compatible)
- MySQL (installed and running)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/speaker-booking.git
   cd speaker-booking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the `.env` file:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=speaker_booking
   JWT_SECRET=yourjwtsecret
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=your-google-redirect-uri
   GOOGLE_REFRESH_TOKEN=your-google-refresh-token
   ```

4. Set up the MySQL database:

   - Create a new database:
     ```sql
     CREATE DATABASE speaker_booking;
     ```
   - Import the provided schema (e.g., `schema.sql`):
     ```bash
     mysql -u root -p speaker_booking < schema.sql
     ```

5. Start the server:

   ```bash
   node server.js
   ```

6. Access the application:

   - Base URL: `http://localhost:5000`

---

## Database Schema

### Tables:

- **users:**
  - `id`, `first_name`, `last_name`, `email`, `password`, `user_type`, `otp`, `is_verified`
- **speaker_profiles:**
  - `id`, `user_id`, `expertise`, `price_per_session`
- **bookings:**
  - `id`, `user_id`, `speaker_id`, `timeslot_id`, `status`
- **time_slots:**
  - `id`, `speaker_id`, `date`, `start_time`, `end_time`

---

## API Endpoints

### Authentication

1. **Signup:**
   - `POST /auth/signup`
   - Body:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "email": "john.doe@example.com",
       "password": "password123",
       "user_type": "user"
     }
     ```

2. **Login:**
   - `POST /auth/login`
   - Body:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```

3. **Verify OTP:**
   - `POST /auth/verify`
   - Body:
     ```json
     {
       "email": "john.doe@example.com",
       "otp": "123456"
     }
     ```

### Speaker Profile

1. **Create Profile:**
   - `POST /speaker/profile`
   - Requires Bearer Token (JWT).
   - Body:
     ```json
     {
       "expertise": "Software Engineering",
       "price_per_session": 100
     }
     ```

2. **Get Profile:**
   - `GET /speaker/profile/:id`

### Booking

1. **Book a Speaker:**
   - `POST /booking`
   - Body:
     ```json
     {
       "speaker_id": 1,
       "timeslot_id": 2
     }
     ```

2. **View Bookings:**
   - `GET /booking/user`


## Usage

- Use Postman or a similar API client to test the endpoints.
- Ensure you include the JWT token for protected routes.
- Example for creating a speaker profile:
  1. Login as a speaker to get a JWT token.
  2. Use the token to authenticate the `POST /speaker/profile` endpoint.


