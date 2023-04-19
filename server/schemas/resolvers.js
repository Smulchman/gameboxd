const { User, Entry } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (parent, { username }) => {
      return await Entry.find({ username });
    },
  },
};

module.exports = resolvers;
