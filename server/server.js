// express
const express = require('express');
const path = require('path');
// apollo server
const { ApolloServer } = require('apollo-server-express');
// database connection
const db = require('./config/connection');

// rawG API
const api = require('./utils/rawgAPI.js');
// Axios 
const axios = require('axios');


// graphql schemas
const { typeDefs, resolvers } = require('./schemas');
// app & port
const app = express();
const PORT = process.env.PORT || 3001;
// new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// point to dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) =>
  res.sendFile(__dirname, '../client/dist/index.html')
);

// Endpoint to retrieve data from RAWG API
app.get('/rawg-games', async (req, res) => {
  const apiKey = process.env.RAWG_API_KEY;
  const endpointUrl = 'https://rawg-video-games-database.p.rapidapi.com/games';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
    'Authorization': `Bearer ${apiKey}`
  };
  try {
    const response = await axios.get(`${endpointUrl}?key=${apiKey}`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve RAWG games data' });
  }
});

// startserver
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log('server running on http://localhost:3001');
      console.log(`graphql at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
// start apollo server
// connect express middlewar for apollo

// connect the db
// start the express server
startServer();
