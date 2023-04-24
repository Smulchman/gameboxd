// API File

const axios = require('axios');

// Api varibles
// Api Keys
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const RAPID_API_HOST = 'rawg-video-games-database.p.rapidapi.com';
const API_URL = 'https://rawg-video-games-database.p.rapidapi.com/games';

// Api Calling Function for Multiple Games
async function getGames(query) {
  try {
    const params = {
      key: RAWG_API_KEY,
    };

    if (query) {
      params.search = query;
    }

    const response = await axios.get(API_URL, {
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
      params: params,
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}


// Api Calling Function for One Game
async function getGame(gameId) {
  try {
    const response = await axios.get(
      `${API_URL}/${gameId}?key=${RAWG_API_KEY}`,
      {
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getGames, getGame };
