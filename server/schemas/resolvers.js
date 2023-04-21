require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId;
const { getGames, getGame } = require('../utils/rawgAPI.js');
const { AuthenticationError } = require('apollo-server-express');
const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Returns multiple users with their entries
    users: async () => {
      return await User.find({}).populate('entries');
    },

    // Returns a single user with their entries
    user: async (_, { username }) => {
      return await User.findOne({ username }).populate('entries');
    },

    // Returns all entries made by a user
    entries: async (_, { user }) => {
      let temp = await Entry.find().populate('user');
      if (user) {
        temp = temp.filter((entry) => entry.user.username === user);
      }
      return temp;
    },

    // Returns a singular entry made by a user
    entry: async (_, { entryId }) => {
      return await Entry.findById(entryId);
    },

    // Returns all games
    games: async (_, { game }) => {
      const data = await getGames(game);
      return data.results;
    },

    // Returns a game
    game: async (_, { gameId }) => {
      const data = await getGame(gameId);
      return data;
    },
  },
  Mutation: {
    // Creates a user
    addUser: async (_, args) => {
      const user = await User.create(args);
      // Creates a token for the user based of their info
      const token = signToken(user);
      // Returns the user info and their token
      return { token, user };
    },

    // Login
    login: async (_, { email, password }) => {
      // Find a user
      const user = await User.findOne({ email });

      // If no user is found, return message
      if (!user) {
        throw new AuthenticationError('The infomation is incorrect');
      }

      // Check to see if the password is correct from validator in User.js
      const correctPw = await user.isCorrectPassword(password);

      // If incorrect password, return message
      if (!correctPw) {
        throw new AuthenticationError('The infomation is incorrect');
      }
      const token = signToken(user);
      return { token, user };
    },

    //Updates the user's info
    updateUser: async (_, { userId, username, email, password }) => {
      return await User.findOneAndUpdate(
        // Finds the user via their ID
        { _id: userId },
        // Allows them to update their username, email, and password
        { username, email, password },
        // Return the updated info
        { new: true }
      );
    },

    // Add a game to a user's wishlist
    addToWishlist: async (_, { userId, gameId }) => {
      return await User.findOneAndUpdate(
        // Find User
        { _id: userId },
        // Push the game into the wishlist via their ID
        { $push: { wishlist: gameId } }
      );
    },

    // Remove the game from the user's wishlist
    removeFromWishlist: async (_, { userId, gameId }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        // Remove the game from their wishlist via the game's ID
        { $pull: { wishlist: gameId } }
      );
    },

    // Delete a user
    removeUser: async (_, { userId }) => {
      return await User.findOneAndDelete({ _id: userId });
    },

    // Adds a review entry
    addEntry: async (
      _,
      { game, user, datePlayed, platform, review, score }
    ) => {
      // Creates the entry
      const gameboy = await Entry.create({
        game,
        user: new ObjectId(user),
        datePlayed,
        platform,
        review,
        score,
      });
      // Connects the entry to the user and pushes it to their entries array
      await User.findOneAndUpdate(
        { _id: user },
        { $push: { entries: new ObjectId(gameboy._id) } }
      );
      return gameboy;
    },

    // Updates the entry
    updateEntry: async (_, { entryId, datePlayed, platform, review }) => {
      return await Entry.findOneAndUpdate(
        // Finds entry via their id
        { _id: entryId },
        // Updates the info
        { datePlayed, platform, review },
        // Returns updated info
        { new: true }
      );
    },
    // Deletes the entry via their id
    removeEntry: async (_, { entryId }) => {
      return await Entry.findOneAndDelete({ _id: entryId });
    },
  },
};

module.exports = resolvers;
