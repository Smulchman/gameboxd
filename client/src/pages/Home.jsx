import * as React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
// import reactLogo from '../assets/react.svg';
import Signin from '../components/Signin.jsx';
// modal stuff
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// jimmy's cool images
import QuiltedImageList from '../components/gamebox';
// auth for conditional rendering
import Auth from '../utils/auth.js';
// stuff for making queries
import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '../utils/queries.js';

// modal stuff
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  bgcolor: '#292827',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SimpleContainer() {
  // modal stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, data, error } = useQuery(GET_ENTRIES);

  console.log(data);

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
      <Container maxWidth="xl" style={{ height: '85vh', marginTop: 25 }}>
        <Box sx={{ bgcolor: '#292827', height: '50vh' }}>
          <img
            src={
              'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg?w=121&h=121&fit=crop&auto=format'
            }
            width="100%"
            height="100%"
          />
        </Box>
        {/* modal stuff starts */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#292827',
            width: '100%',
            color: 'white',
            marginTop: 50,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ width: '100%' }}>Track Games You've Played</h3>
            <h3 style={{ width: '100%' }}>Save Those You Want To Play</h3>
            {Auth.loggedIn() ? (
              <h3 style={{ width: '100%' }}>
                {' '}
                Click the search icon to find games
              </h3>
            ) : (
              <Button
                variant="contained"
                size="large"
                sx={{ width: '200px', height: '60px' }}
                onClick={handleOpen}
                style={{
                  padding: '4px',
                  margin: '5px',
                  backgroundColor: '#133955',
                }}
              >
                Sign in!
              </Button>
            )}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Signin />
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
        <div
        style={{backgroundColor: '#292827'}}
        >
          <QuiltedImageList />
        </div>
      </Container>
    </div>
  );
}
// if the user is not signed in, the signin button is displayed
// signin button triggers modal popup which contains signin form.
