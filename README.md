A robust Speaker Booking System built with Node.js, Express, MySQL, and JWT for authentication. This platform enables users to create profiles, book speakers, manage speaker sessions, and handle authentication securely.

Table of Contents

Features
Tech Stack
Installation
Database Schema
API Endpoints
Usage


Features

User Authentication:
Signup/Login with JWT-based authentication.
OTP verification for new users.

Role Management:
Distinguish between regular users and speakers.

Speaker Profiles:
Creation and management of speaker profiles.
Expertise and pricing details.

Booking System:
Users can book sessions with speakers.

Protected Endpoints:

Secure APIs with role-based access control.
Database Integration:
Seamlessly integrates with MySQL for data storage.


Tech Stack

Backend Framework: Node.js, Express.js
Database: MySQL
Authentication: JWT (JSON Web Token)
Other Libraries: Bcrypt, MySQL2, Dotenv

Installation

Prerequisites

Node.js (v22.12.0 or compatible)
MySQL (installed and running)

Steps

1. Clone the repository:
git clone https://github.com/yourusername/speaker-booking.git
cd speaker-booking

2. Install dependencies:
npm install

3. Set up the .env file:

Create a .env file in the root directory and add the following:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=speaker_booking
JWT_SECRET=yourjwtsecret

4. Set up the MySQL database:

Create a new database:
CREATE DATABASE speaker_booking;

Import the provided schema (e.g., schema.sql):
mysql -u root -p speaker_booking < schema.sql

5. Start the server:
node server.js

6. Access the application:
Base URL: http://localhost:5000

Database Schema

Tables:
(i) users:

id, first_name, last_name, email, password, user_type, otp, is_verified

(ii)speaker_profiles:

id, user_id, expertise, price_per_session

(iii)bookings:

id, user_id, speaker_id, timeslot_id, status

(iv)time_slots:

id, speaker_id, date, start_time, end_time


API Endpoints

Authentication

1. Signup:

(i)POST /auth/signup

(ii)Body:

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "user_type": "user"
}

2. Login:

(i)POST /auth/login

(ii)Body:

{
  "email": "john.doe@example.com",
  "password": "password123"
}

3. Verify OTP:

(i)POST /auth/verify

(ii)Body:

{
  "email": "john.doe@example.com",
  "otp": "123456"
}


Speaker Profile

(1)Create Profile:

(i)POST /speaker/profile

(ii)Requires Bearer Token (JWT).

(iii)Body:

{
  "expertise": "Software Engineering",
  "price_per_session": 100
}

(2)Get Profile:

(i)GET /speaker/profile/:id

Booking

Book a Speaker:

(i)POST /booking

(ii)Body:

{
  "speaker_id": 1,
  "timeslot_id": 2
}

(2)View Bookings:

(i)GET /booking/user

Usage

Use Postman or a similar API client to test the endpoints.

Ensure you include the JWT token for protected routes.

Example for creating a speaker profile:
Login as a speaker to get a JWT token.

Use the token to authenticate the POST /speaker/profile endpoint.
