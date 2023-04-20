// .env
require('dotenv').config({ path: "../.env" });
console.log('RAWG_API_KEY', process.env.RAWG_API_KEY)
// import dotenv from "dotenv";

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
// import function 
const {getGames} = require('./utils/rawgAPI.js'); 


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

getGames();

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
