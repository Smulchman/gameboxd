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
    // If a query is added, then add the noSpaceQuery and use the search within the api fetch URL, else
    // use the normal api fetch URL
    if (query) {
      // Removes white space and replaces it with "'%20"
      let noSpaceQuery = query.replace(/ /g, '%20');

      // Api Fetch
      const response = await axios.get(
        `${API_URL}?search=${noSpaceQuery}&key=${RAWG_API_KEY}`,
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
      // Api Fetch
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
