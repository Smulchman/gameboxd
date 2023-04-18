const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    entries: [Entry]
  }
  type Entry {
    _id: ID
    game: String
    user: User
    datePlayed: String
    platform: String
    review: String
    createdAt: String
    updatedAt: String
  }
  type Game {
    name: String
    image: String
    genres: [Genre]
    platforms: [Platform]
  }
  type Genre {
    name: String
  }
  type Platform {
    name: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    entries(username: String): [Entry]
    entry(entryId: ID!): Entry
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEntry(game: String!, user: String!, datePlayed: String, platform: String, review: String): Entry
    login(email: String!, password: String!): Auth
    updateUser(userId: ID!, username: String, email: String, password: String): User
    updateEntry(entryId: ID!, datePlayed: String, platform: String, review: String): Entry
    removeUser(userId: ID!): User
    removeEntry(entryId: ID!): Entry
  }
`;

module.exports = typeDefs;
