// const {getGames} = require('../utils/api')
const axios = require('axios');
const resolvers = {
  Query: {
    users: async () => {
      return [
        {
          _id: 'asdioufo9a8rtjaod8iosmf',
          username: 'Mork',
          email: 'mork@nanoo.org',
          password: 'youllneverguess',
        },
      ];
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
