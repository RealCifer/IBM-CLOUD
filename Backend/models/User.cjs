const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows some users to not have googleId (e.g., local users)
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function () {
      return this.provider === 'local'; // Only required for local auth
    }
  },
  picture: {
    type: String
  },
  given_name: String,
  family_name: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'local'],
    default: 'google' // Set "google" by default for OAuth users
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
