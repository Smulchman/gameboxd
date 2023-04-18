const axios = require("axios");

const apiKey = process.env.RAWG_API_KEY;
const endpointUrl = "https://api.rawg.io/api/games";
const headers = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
};

axios
  .get(`${endpointUrl}?key=${apiKey}`, { headers })
  .then((response) => {
    console.log(response.data);
    // process the data here
  })
  .catch((error) => console.error(error));

