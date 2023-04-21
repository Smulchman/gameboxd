// Dependecies
// .env
require('dotenv').config({ path: '../.env' });

// Express
const express = require('express');
const path = require('path');
// Database connection
const db = require('./config/connection');
// Apollo server
const { ApolloServer } = require('apollo-server-express');

// Graphql schemas
const { typeDefs, resolvers } = require('./schemas');
// App & port
const app = express();
const PORT = process.env.PORT || 3001;

// New apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Point to dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Use index.html from client side
app.get('/', (req, res) =>
  res.sendFile(__dirname, '../client/dist/index.html')
);

// Start server function
const startServer = async () => {
  // Start apollo server
  await server.start();
  // Connect express middleware for apollo
  server.applyMiddleware({ app });
  // Connect the db
  db.once('open', () => {
    app.listen(PORT, () => {
      // Server Page
      console.log('server running on http://localhost:3001');
      // Graphql Page
      console.log(`graphql at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the express server
startServer();
