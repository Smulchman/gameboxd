// const {getGames} = require('../utils/api')
const axios = require('axios');
const { User, Entry } = require('../models');

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (_, { username }) => {
      // Entry will have a gameData virtual property that will be populated with the game data from the API
      return await Entry.find({ username });
    },
    games: async () => {
      const data = await axios.get(
        'https://rawg-video-games-database.p.rapidapi.com/games?key=5cb5074085274b3aab2431311200438c',
        {
          headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAWG_API_KEY,
          },
        }
      );
      const game = data.data.results;
      return game;
    },
  },
};

module.exports = resolvers;
