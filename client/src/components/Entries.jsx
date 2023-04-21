import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';


function Entries({ image, platform, game, createdAt, genre, username, review }) {
    return (
      <Box py={2}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box display="flex">
            {/* left column */}
            <Box mr={2}>
              {/* image display */}
            </Box>
  
            {/* right column */}
            <Box flex="1">
              {/* platform display */}
              {/* genre display */}
              {/* review created display */}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
  