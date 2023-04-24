import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// material stuff
import GameReviewCard from '../components/GameReviewCard';
import { useLazyQuery } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import { useQuery } from '@apollo/client';
import { GET_GAME_BY_NAME } from '../utils/queries';
import TextField from '@mui/material/TextField';
import Auth from '../utils/auth.js';

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
        height: '100%',
        minHeight: '100vh',
        background: '#292827',
        marginBottom: '1em',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          margin: '1em',
          height: '100%',
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
              background: '#282827',
              // height: '2em', - commented out, blue outline was bigger than the white box
              // borderRadius: '1em', - commented out, don't know how to change shape of blue outline
              fontSize: '1.5em',
              color: 'white',
              border: '2px solid white',
            }}
            InputProps={{
              style: { color: 'white' },
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
          marginBottom: '2em',
          backgroundColor: '#292827',
          height: '100%',
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
      <div style={{ marginBottom: '2em' }}></div>
    </div>
  );
}
