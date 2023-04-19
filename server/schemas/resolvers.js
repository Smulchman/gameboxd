const { User, Entry } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (parent, { username }) => {
      // Entry will have a gameData virtual property that will be populated with the game data from the API
      return await Entry.find({ username });
    },
  },
};

module.exports = resolvers;
