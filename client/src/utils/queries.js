import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query Games {
    games {
      background_image
      name
      released
      esrb_rating {
        name
      }
      description_raw
      genres {
        name
      }
      platforms {
        platform {
          name
        }
      }
    }
  }
`;

export const GET_GAME_BY_NAME = gql`
query Games($game: String) {
  games(game: $game) {
    background_image
    id
    name
  }
}
`;

export const GET_GAME_BY_ID = gql`
query Game($gameId: Int!) {
  game(gameId: $gameId) {
    name
    description_raw
    background_image
    released
  }
}
`;