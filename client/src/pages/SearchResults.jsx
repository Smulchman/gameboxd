import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// material stuff
import GameReviewCard from '../components/GameReviewCard';
import Input from '@mui/material/Input';

import FormControl from '@mui/material/FormControl';
import { useQuery } from '@apollo/client';
import { GET_GAME_BY_NAME } from '../utils/queries';
import Box from '@mui/material/Box';
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
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getGameData();
    }
  };
  const { loading, error, data } = useQuery(GET_GAME_BY_NAME, {
    variables: {
      game: formState.game,
    },
  });

  const getGameData = () => {
    const results = data;
    // if (data) {
    //   console.log(data.games);
    // }
    if (data) {
      setGameData(data.games);
      console.log(gameData);
    }
  };
  console.log(gameData);

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
          {/* id="gameSearch"
            
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon
                  onClick={getGameData}
                  style={{
                    margin: '.5em',
                    fontSize: '1em',
                    cursor: 'crosshair',
                  }}
                />
              </InputAdornment>
            }
          /> */}
        </FormControl>
      </div>
      <div
        style={{
          marginTop: '2em',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1em',
          background: '#292827',
        }}
      >
        {gameData.map((game) => (
          // <div
          //   key={game.id}
          //   style={{
          //     width: '250px',
          //     height: '350px',
          //     marginBotton: '1em',
          //   }}
          // >
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
