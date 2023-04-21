import { gql } from '@apollo/client';

export const GET_IMG = gql`
  query Games {
    games {
      name
      background_image
    }
  }
`;

export const GET_GAME_BY_NAME = gql`
query Games($game: String) {
  games(game: $game) {
    background_image
    id
    description_raw
    name
  }
}
`;