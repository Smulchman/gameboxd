const axios = require('axios');

const RAWG_API_KEY = process.env.RAWG_API_KEY;

const RAPID_API_KEY = process.env.RAPID_API_KEY;

const RAPID_API_HOST = 'rawg-video-games-database.p.rapidapi.com';
const API_URL = 'https://rawg-video-games-database.p.rapidapi.com/games'

async function getGames(query) {
  try {
    const queryParams = query ? { search: query } : {};
    const response = await axios.get(`${API_URL}?key=${RAWG_API_KEY}`, {
      params: queryParams,
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

module.exports = { getGames };

