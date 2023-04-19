// header with hero image/ logo and name
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import reactLogo from '../assets/react.svg';
import Signin from '../components/Signin.jsx';

export default function SimpleContainer() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: '#292827', height: '50vh' }}>
        <img src={reactLogo} width="80%" height="90%" />
      </Box>
    </Container>
  );
}
// row of video games in cards

// if the user is not signed in, the signin button is displayed
// signin button triggers modal popup which contains signin form.

// if signed in, will display dropdown menu for -->
