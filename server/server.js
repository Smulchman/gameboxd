// express
const express = require('express');
const path = require('path');
// apollo server
const { ApolloServer } = require('apollo-server-express');
// database connection
const db = require('./config/connection');
// const api = require('./utils/api');
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

app.get('/', (req, res) => {
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
});

// point to dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) =>
  res.sendFile(__dirname, '../client/dist/index.html')
);

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
