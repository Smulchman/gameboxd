const axios = require('axios');

const RAWG_API_KEY = process.env.RAWG_API_KEY;

const RAPID_API_KEY = process.env.RAPID_API_KEY;

const RAPID_API_HOST = 'rawg-video-games-database.p.rapidapi.com';
const API_URL = 'https://rawg-video-games-database.p.rapidapi.com/games'

async function getGames(query) {
  try {
    if (query) {
      let noSpaceQuery = query.replace(/ /g, '%20');
      const response = await axios.get(
        `${API_URL}?search=${query}&key=${RAWG_API_KEY}`,
        {
          headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST,
          },
        }
      );
      const data = response.data;
      return data;
    } else {
      const response = await axios.get(`${API_URL}?key=${RAWG_API_KEY}`, {
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      });
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getGame(gameId) {
  try {
    const response = await axios.get(`${API_URL}/${gameId}?key=${RAWG_API_KEY}`, {
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getGames, getGame };
