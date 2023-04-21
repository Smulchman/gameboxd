import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
// material stuff
import GameReviewCard from '../components/GameReviewCard';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


export default function SearchResults() {



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
        style={{ 
          background: 'white',
          height: '3em',
          borderRadius: '2em',
          fontSize: '1.5em' 
        }}
          id="gameSearch"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon style={{margin: '2em', fontSize: '2em'}} />
            </InputAdornment>
          }
        />
       </FormControl>
      </div>
      <GameReviewCard style={{ marginTop: '2em'}} />
    </div>
  );
}
