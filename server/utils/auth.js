require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.token;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid Token');
    }
    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, password, _id }) {
    const payload = { email, password, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
