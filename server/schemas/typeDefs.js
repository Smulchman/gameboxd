const { gql } = require('apollo-server-express');

// I might want to change the type from 'Platform' in the Entry typedef and have it just be a string
// Further down, the 'Platform' Type is for the specific console, not the 'parent platform'

// """"
// Comment
// """"
// ^ The structure above is a comment inside graphql. You can view it in the apollo server sandbox

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String

    """
    Entries is an array of all the review entries that the specific user has made
    """
    entries: [Entry]

    """
    Wishlist is an array of all the games that the user added in their wishlist
    """
    wishlist: [GameID]
  }

  """
  Entries has an infinite that occurs with User referencing to an array of entries and the entries reference to the users. Just add the User once in graphql to see the data you need via the entries.
  """
  type Entry {
    _id: ID
    game: Int
    gameData: Game
    user: User
    datePlayed: String
    platform: String
    review: String
    score: Int
    createdAt: String
  }

  type GameID {
    gameId: Int
  }

  type Game {
    id: Int
    name: String
    background_image: String
    released: String
    esrb_rating: ESRB
    description_raw: String
    genres: [Genre]
    metacritic: Int

    """
    The api has the game systems within an object of "platforms" within another object of "platforms", so we need to layer the platform typeDefs multiple times
    """
    platforms: [PlatformObj]
    short_screenshots: [Screenshot]
  }

  type ESRB {
    name: String
  }

  type Genre {
    name: String
  }

  type PlatformObj {
    platform: Platform
  }

  type description_raw {
    name: String
  }

  type Platform {
    name: String
  }

  type Screenshot {
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    games(game: String): [Game]
    game(gameId: Int!): Game
    entries(user: String): [Entry]
    entry(entryId: ID!): Entry
  }

  type Mutation {
    addUser(username: ID!, email: String!, password: String!): Auth
    addEntry(
      game: Int!
      user: ID!
      datePlayed: String
      platform: String
      review: String
      score: Int
    ): Entry
    login(email: String!, password: String!): Auth
    updateUser(
      userId: ID!
      username: String
      email: String
      password: String
    ): User
    updateEntry(
      entryId: ID!
      datePlayed: String
      platform: String
      review: String
    ): Entry
    addToWishlist(userId: ID!, gameId: Int!): User
    removeFromWishlist(userId: ID!, gameId: Int!): User
    removeUser(userId: ID!): User
    removeEntry(entryId: ID!): Entry
  }
`;

module.exports = typeDefs;
