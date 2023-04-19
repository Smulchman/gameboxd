const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
  game: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
