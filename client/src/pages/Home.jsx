// header with hero image/ logo and name
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import reactLogo from '../assets/react.svg';
export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: 'black', height: '50vh' }}>
          <img src={reactLogo} width="80%" height="90%" />
        </Box>
      </Container>
    </React.Fragment>
  );
}
// row of video games in cards

// if the user is not signed in, the signin button is displayed
