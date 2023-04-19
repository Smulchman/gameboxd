const { User, Entry } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (parent, { username }) => {
      // query your mongoose model for entries
      // map through entries and make api calls for game data associated with each entry
      // return all the data to the client
      return await Entry.find({ username });
    },
  },
};

module.exports = resolvers;
