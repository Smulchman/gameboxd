const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.99,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
