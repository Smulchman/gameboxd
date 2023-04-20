const { getGames } = require('../utils/rawgAPI.js');
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
      return data.results.find((game) => game.id === parseInt(gameId));
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('The infomation is incorrect');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('The infomation is incorrect');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { userId, username, email, password }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { username: username },
        { email: email },
        { password: password }
      );
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },
};

module.exports = resolvers;
