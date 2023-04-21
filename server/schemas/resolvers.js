const { getGames, getGame } = require('../utils/rawgAPI.js');
require('dotenv').config();
const { AuthenticationError } = require('apollo-server-express');
const axios = require('axios');
const { User, Entry } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
require('dotenv').config();
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('entries');
    },
    user: async (_, { username }) => {
      return await User.findOne({ username }).populate('entries');
    },
    entries: async (_, { user }) => {
      let temp = await Entry.find().populate('user');
      if (user) {
        temp = temp.filter((entry) => entry.user.username === user);
      }
      return temp;
    },
    entry: async (_, { entryId }) => {
      return await Entry.findById(entryId);
    },
    games: async (_, { game }) => {
      const data = await getGames(game);
      return data.results;
    },
    game: async (_, { gameId }) => {
      const data = await getGame(gameId);
      return data;
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (_, { email, password }) => {
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
    updateUser: async (_, { userId, username, email, password }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { username, email, password },
        { new: true }
      );
    },
    addToWishlist: async (_, { userId, gameId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $push: { wishlist: gameId } }
      );
    },
    removeFromWishlist: async (_, { userId, gameId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { wishlist: gameId } }
      );
    },
    removeUser: async (_, { userId }) => {
      return await User.findOneAndDelete({ _id: userId });
    },
    addEntry: async (
      _,
      { game, user, datePlayed, platform, review, score }
    ) => {
      const gameboy = await Entry.create({
        game,
        user: new ObjectId(user),
        datePlayed,
        platform,
        review,
        score,
      });
      await User.findOneAndUpdate(
        { _id: user },
        { $push: { entries: new ObjectId(gameboy._id) } }
      );
      return gameboy;
    },
    updateEntry: async (_, { entryId, datePlayed, platform, review }) => {
      return await Entry.findOneAndUpdate(
        { _id: entryId },
        { datePlayed, platform, review },
        { new: true }
      );
    },
    removeEntry: async (_, { entryId }) => {
      return await Entry.findOneAndDelete({ _id: entryId });
    },
  },
};

module.exports = resolvers;
