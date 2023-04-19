const axios = require('axios');

const apiKey = '5cb5074085274b3aab2431311200438c';
const endpointUrl = 'https://api.rawg.io/api/games';
const headers = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': '87cdee1fecmsha53138e19c8fc31p120979jsnc537093c677e',
  'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
};

axios
  .get(`${endpointUrl}?key=${apiKey}`, { headers })
  .then((response) => {
    console.log(response.data);
    // process the data here
  })
  .catch((error) => console.error(error));

const getGames = () => {
  console.log('hello');
};
module.exports = getGames;
