require('dotenv').config();
const { AuthenticationError } = require('apollo-server-express');
const axios = require('axios');
const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (_, { username }) => {
      return await Entry.find({ username });
    },
    games: async () => {
      const data = await axios.get(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=${process.env.RAWG_API_KEY}`,
        {
          headers: {
            'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
          },
        }
      );
      const game = data.data.results;
      return game;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
