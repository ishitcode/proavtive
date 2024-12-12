CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    user_type ENUM('user', 'speaker') NOT NULL DEFAULT 'user',
    is_verified TINYINT(1) DEFAULT 0,
    otp VARCHAR(6)
);

CREATE TABLE speaker_profiles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    speaker_id INT NOT NULL,
    expertise TEXT NOT NULL,
    price_per_session DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (speaker_id) REFERENCES users(id)
);

CREATE TABLE time_slots (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    speaker_id INT NOT NULL,
    slot_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available TINYINT(1) DEFAULT 1,
    is_booked TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (speaker_id) REFERENCES users(id)
);

CREATE TABLE sessions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    speaker_id INT,
    time_slot DATETIME,
    user_id INT,
    FOREIGN KEY (speaker_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bookings (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    speaker_id INT NOT NULL,
    time_slot_id INT NOT NULL,
    booking_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (speaker_id) REFERENCES users(id),
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id)
);
