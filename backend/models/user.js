const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  CodeForcesNotificationTime: {
    type: Number,
    default: 0
  },
  CodeChefNotificationTime: {
    type: Number,
    default: 0
  },
  LeetCodeNotificationTime: {
    type: Number,
    default: 0
  },
  HackerRankNotificationTime: {
    type: Number,
    default: 0
  },
  AtCoderNotificationTime: {
    type: Number,
    default: 0
  },
  HackerEarthNotificationTime: {
    type: Number,
    default: 0
  },
  TopCoderNotificationTime: {
    type: Number,
    default: 0
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
