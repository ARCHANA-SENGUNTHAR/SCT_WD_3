const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  scores: [
    {
      level: Number,
      topic: String,
      score: Number,
      timeTaken: Number,
      attemptedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
