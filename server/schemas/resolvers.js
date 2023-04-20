// const {getGames} = require('../utils/api')
const axios = require('axios');
const { User, Entry } = require('../models');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (_, { username }) => {
      return await Entry.find({ username });
    },
    games: async (_, { game }) => {
      const data = await axios.get(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=${process.env.RAWG_API_KEY}`,
        {
          headers: {
            'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
          },
        }
      );
      const gameResults = data.data.results;
      return gameResults;
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // const token = signToken(user);
      // below should return token as well I believe
      return { user };
    },
  }
};

module.exports = resolvers;
