const mongoose = require('mongoose');
const { Schema } = mongoose;
const axios = require('axios');
require('dotenv').config();

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const entrySchema = new Schema(
  {
    game: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

entrySchema.virtual('gameData').get(async function () {
  const gameID = this.game;
  const { data } = await axios.get(
    `https://rawg-video-games-database.p.rapidapi.com/games/${gameID}?key=${process.env.RAWG_API_KEY}`,
    {
      headers: {
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
    }
  );
  return data;
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
