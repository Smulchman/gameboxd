const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');

const entrySchema = new Schema({
  game: {
    type: String,
    required: true,
  },
  user: {
    type: User.schema,
    required: true,
  },
  datePlayed: {
    type: String,
    required: false,
  },
  platform: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    minimum: 0,
    maximum: 100,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
