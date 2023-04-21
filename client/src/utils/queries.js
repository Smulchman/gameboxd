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
