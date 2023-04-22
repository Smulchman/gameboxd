import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: ID!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const ADD_ENTRY_BY_USER = gql`
  mutation Mutation(
    $game: Int!
    $user: ID!
    $datePlayed: String
    $platform: String
    $review: String
  ) {
    addEntry(
      game: $game
      user: $user
      datePlayed: $datePlayed
      platform: $platform
      review: $review
    ) {
      gameData {
        background_image
        description_raw
        name
      }
      createdAt
      review
      platform
    }
  }
`;
