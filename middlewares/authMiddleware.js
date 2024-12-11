const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../config/db');

dotenv.config();

// Middleware to authenticate the token and set the user
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};

// Middleware to check if the user is a speaker
const authorizeSpeaker = (req, res, next) => {
  const { user_type } = req.user;
  
  if (user_type !== 'speaker') {
    return res.status(403).json({ message: 'Access denied. You must be a speaker to perform this action.' });
  }
  
  next();
};

// Middleware to check if the user is a user (not a speaker)
const authorizeUser = (req, res, next) => {
  const { user_type } = req.user;
  
  if (user_type !== 'user') {
    return res.status(403).json({ message: 'Access denied. You must be a user to perform this action.' });
  }
  
  next();
};

module.exports = { authenticateToken, authorizeSpeaker, authorizeUser };
