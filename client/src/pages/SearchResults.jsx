import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// material stuff
import GameReviewCard from '../components/GameReviewCard';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useQuery } from '@apollo/client';
import { GET_GAME_BY_NAME } from '../utils/queries';

export default function SearchResults() {
  const [formState, setFormState] = useState({game: ''});
  const [gameData, setGameData] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(formState);
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
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100vh',
      background: '#292827'
    }}>
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center',
        margin: '1em' 
      }}>
       <FormControl style={{ 
          width: '60%' 
        }} variant="standard">
          <h3 style={{color: 'white', fontSize: '1.5em'}}>Search a game to review!</h3>
        <Input
        onChange={handleChange}
        name='game'
        style={{ 
          background: 'white',
          height: '3em',
          borderRadius: '2em',
          fontSize: '1.5em' 
        }}
          id="gameSearch"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon 
              onClick={getGameData}
              style={{margin: '1em', fontSize: '2em', cursor: 'crosshair'}}
               />
            </InputAdornment>
          }
        />
       </FormControl>
      </div>
      {/* <GameReviewCard style={{ marginTop: '2em'}} /> */}
      <div style={{ marginTop: '2em' }}>
        {gameData.map((game) => (
          <GameReviewCard
            key={game.id}
            title={game.name}
            imageUrl={game.background_image}
            gameId={game.id}
          />
        ))}
      </div>
    </div>
  );
}

