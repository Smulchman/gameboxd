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
      return await User.find({});
    },
    entries: async (_, { username }) => {
      return await Entry.find({ username }).populate('user');
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
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
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
      console.log(gameboy);
      return gameboy;
    },
  },
};

module.exports = resolvers;
