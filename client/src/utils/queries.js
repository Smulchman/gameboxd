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
      id
      name
      background_image
      released
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

export const GET_ENTRIES = gql`
query Query {
  entries {
    _id
    createdAt
    game
    gameData {
      platforms {
        platform {
          name
        }
      }
      background_image
      description_raw
      genres {
        name
      }
      id
    }
    review
    user {
      username
    }
  }
}
`;