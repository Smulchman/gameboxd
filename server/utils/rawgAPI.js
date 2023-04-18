const axios = require("axios");

const rawgAPI = axios.create({
  baseURL: "https://api.rawg.io/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = rawgAPI;
