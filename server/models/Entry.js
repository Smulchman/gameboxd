const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
  game: {
    type: String,
    required: true,
    unique: true,
  },
  datePlayed: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: String,
    required: false,
  },
});


const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
