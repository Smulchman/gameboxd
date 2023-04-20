import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query Games {
    games {
      background_image
      name
    }
  }
`;
