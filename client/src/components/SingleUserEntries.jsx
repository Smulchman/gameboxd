import React from 'react';
import { Box, Paper } from '@mui/material';

// pass all props that will be used in Home.jsx (from entry query)
export default function Entries({
  image,
  platform,
  game,
  description,
  createdAt,
  review,
}) {
  return (
    <Box py={2} sx={{ backgroundColor: '#292827' }}>
      <Paper
        elevation={5}
        sx={{
          p: 2,
          backgroundColor: '#292827',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
        style={{
          border: '2px solid silver',
        }}
      >
        {/* left column */}
        <Box mr={2} sx={{ flex: '1 1 33%', textAlign: 'center' }}>
          {/* image display */}
          <img src={image} style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        {/* middle column */}
        <Box
          mr={2}
          sx={{ flex: '1 1 33%', textAlign: 'center' }}
          className="shimmer"
        >
          <h2> {game}</h2>
          <p>{description}</p>
        </Box>
        {/* right column */}
        <Box sx={{ flex: '1 1 33%', textAlign: 'center' }} className="shimmer">
          <p>played on {platform} </p>
          <p>Review created on {createdAt}:</p>
          <p>
            <span style={{ fontStyle: 'italic', fontFamily: 'cursive' }}>
              {review}
            </span>{' '}
          </p>
        </Box>
      </Paper>
      {/* defines a shimmer effect for the reviews */}
      <style>
        {`
              /* define the shimmer animation */
              @keyframes shimmer {
                0% {
                  background-position: -1000px 0;
                }
                100% {
                  background-position: 1000px 0;
                }
              }
      
              /* apply the shimmer animation on hover */
              .shimmer:hover {
                background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.1) 40%);
                background-repeat: repeat-x;
                background-size: 1000px 100%;
                animation-name: shimmer;
                animation-duration: 1s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
              }
            `}
      </style>
    </Box>
  );
}
