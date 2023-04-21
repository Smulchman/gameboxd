import { GET_GAME_BY_NAME } from "./queries";
import { useQuery } from '@apollo/client';

export const getGameData = async (formState) => {
  const { data } = await useQuery({
    GET_GAME_BY_NAME,
    variables: {
      game: formState.game,
    },
  });
  return data;
};

// export default getGameData();