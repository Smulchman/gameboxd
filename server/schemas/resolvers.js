const {getGames} = require('../utils/rawgAPI.js')
const axios = require('axios');
const { User, Entry } = require('../models');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { username }) => {
      return await User.findOne({ username });
    },
    entries: async (_, { username }) => {
      return await Entry.find({ username });
    },
    entry: async (_, { entryId }) => {
      return await Entry.findById(entryId);
    },
    games: async (_, { game }) => {
      const data = await getGames(game);
      return data.results;
    },
    game: async (_, { gameId }) => {
      const data = await getGames();
      return data.results.find(game => game.id === parseInt(gameId));
    },
  },
};

module.exports = resolvers;
