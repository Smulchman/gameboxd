// const {getGames} = require('../utils/api')
const axios = require('axios');
const { User, Entry } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    entries: async (_, { username }) => {
      // Entry will have a gameData virtual property that will be populated with the game data from the API
      return await Entry.find({ username });
    },
    games: async () => {
      const data = await axios.get(
        'https://rawg-video-games-database.p.rapidapi.com/games?key=5cb5074085274b3aab2431311200438c',
        {
          headers: {
            'x-rapidapi-key':
              '87cdee1fecmsha53138e19c8fc31p120979jsnc537093c677e',
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
          },
        }
      );
      const game = data.data.results;
      return game;
    },
  },
};

module.exports = resolvers;
