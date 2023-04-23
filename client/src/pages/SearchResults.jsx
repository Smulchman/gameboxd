import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// material stuff
import GameReviewCard from '../components/GameReviewCard';
import Input from '@mui/material/Input';
import { useLazyQuery } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import { useQuery } from '@apollo/client';
import { GET_GAME_BY_NAME } from '../utils/queries';
import TextField from '@mui/material/TextField';

export default function SearchResults() {
  const [formState, setFormState] = useState({ game: '' });
  const [gameData, setGameData] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleClick = () => {
    getGameData();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getGameData();
    }
  };

  const [getGameData, { loading, error, data }] = useLazyQuery(
    GET_GAME_BY_NAME,
    {
      variables: {
        game: formState.game,
      },
    }
  );

  // Update gameData when the data is fetched
  useEffect(() => {
    if (data && data.games) {
      setGameData(data.games);
    }
  }, [data]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '100vh',
        background: '#292827',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          margin: '1em',
        }}
      >
        <FormControl
          style={{
            width: '60%',
            outline: 'none',
          }}
          // variant="standard"
        >
          <h3 style={{ color: 'white', fontSize: '1.5em' }}>
            Search a game to review!
          </h3>
          <TextField
            id="gameSearch"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            name="game"
            style={{
              background: 'white',
              height: '2em',
              // borderRadius: '1em',
              fontSize: '1.5em',
            }}
          />
        </FormControl>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '1em',
          marginTop: '2em',
          backgroundColor: '#292827',
          marginBottom: '5em',
        }}
      >
        {gameData.slice(0, 20).map((game) => (
          <GameReviewCard
            key={game.id}
            title={game.name}
            imageUrl={game.background_image}
            gameId={game.id}
            released={game.released}
            genres={game.genres}
            platform={game.platforms}
          />

          // </div>
        ))}
      </div>
    </div>
  );
}
