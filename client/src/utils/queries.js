import { gql } from '@apollo/client';

export const GET_IMG = gql`
  query Games {
    games {
      name
      background_image
    }
  }
`;
