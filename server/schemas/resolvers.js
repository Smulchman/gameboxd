// const {getGames} = require('../utils/api')
const axios = require('axios');
const { User, Entry } = require('../models');
require("dotenv").config()

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (parent, { username }) => {
      return await Entry.find({ username });
    },
    games: async () => {
      const data = await axios.get(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=${process.env.RAWG_API_KEY}`,
        {
          headers: {
            'x-rapidapi-key':
              `${process.env.RAPID_API_KEY}`,
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
          },
        }
      );
      const game = data.data.results;
      return game;
    },
   
  },
};

module.exports = resolvers;
