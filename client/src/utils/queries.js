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
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;