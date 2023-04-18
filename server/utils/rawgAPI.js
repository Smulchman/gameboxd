const axios = require("axios");

const options = {
  method: 'GET',
  url: 'http://localhost:5173/?key=5cb5074085274b3aab2431311200438c',
  headers: {
    'X-RapidAPI-Key': 'f13389262emshd03f88bf6e53023p13de1bjsnba11bbfd6d61',
    'X-RapidAPI-Host': 'http://localhost:5173'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
