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
    datePlayed: String
    // I might want to remove this and have
    // it just be a string
    platform: Platform
    review: String
    score: Int
    createdAt: String
  }

  type Game {
    name: String
    background_image: String
    metacritic: Int
    esrb: ESRB
    genres: [Genre]
    platforms: [Platform]
  }

  type ESRB {
    name: String
  }

  type Genre {
    name: String
  }

  type Platform {
    // this platform is the specific console, not the 'parent platform'
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    games(game: String): [Game]
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
