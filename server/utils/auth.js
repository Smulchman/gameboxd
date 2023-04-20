require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {},
};
