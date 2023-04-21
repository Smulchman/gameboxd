import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';


export default function Entries({ image, platform, game, createdAt, genre, username, review }) {
    return (
      <Box py={2}>
        <Paper elevation={3} sx={{ p: 2, backgroundColor: '#292827', color: 'white', display: 'flex' }}>
          {/* left column */}
          <Box mr={2} sx={{ flex: '1 1 33%', textAlign: 'center' }}>
            {/* image display */}
            <img src={image} style={{ maxWidth: '100%', height: 'auto' }} />
            {/* <h3 style={{ marginTop: '10px' }}>{game}</h3>
            <p>{review}</p> */}
          </Box>
          {/* middle column */}
          <Box mr={2} sx={{ flex: '1 1 33%', textAlign: 'center' }}>
            <h3>{game}</h3>
            <p>{review}</p>
          </Box>
          {/* right column */}
          <Box sx={{ flex: '1 1 33%', textAlign: 'center' }}>
            <p>reviewed by {username} on {createdAt}</p>
            <p>genre: {genre}</p>
            <p>played on {platform}</p>
          </Box>
        </Paper>
      </Box>
    );
}

  