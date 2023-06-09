import React, { useState, useEffect } from 'react';
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
// sam's cool image
import Hero from '../components/Hero.jsx';
// auth for conditional rendering
import Auth from '../utils/auth.js';
// stuff for making queries
import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '../utils/queries.js';
import Entries from '../components/Entries.jsx';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';
// modal stuff
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#292827',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SimpleContainer() {
  // modal stuff
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [entryData, setEntryData] = useState([]);
  //  query to get game review entries
  const { loading, data, error } = useQuery(GET_ENTRIES, {
    variables: { limit: 10 },
  });
  // checks to see if there is data from query --> sets entryData state with the array of entries

  const getEntries = () => {
    const entries = data.entries.slice(-10);
    const reverseEntries = entries.reverse();
    setEntryData(reverseEntries);
  };

  useEffect(() => {
    if (data && !loading) {
      getEntries();
    }
  }, [data, loading]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: '100vh',
        background: '#292827',
        marginBottom: '2em',
      }}
    >
      <Container maxWidth="xl" style={{ marginTop: 25, height: '100%' }}>
        <Hero />
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
            <div
              style={{
                border: '2px dashed white',
                padding: '2em',
                margin: '1em',
              }}
            >
              <h2 style={{ width: '100%' }}>Track Games You've Played</h2>
              <h2 style={{ width: '100%' }}>Save Those You Want To Play</h2>
            </div>
            {/* display login button for modal if not logged in */}
            {Auth.loggedIn() ? (
              <Link to="/SearchResults">
                <Button
                  variant="contained"
                  size="large"
                  sx={{ width: '200px', height: '60px', margin: '1em' }}
                  onClick={handleOpen}
                  style={{
                    padding: '4px',
                    margin: '5px',
                    backgroundColor: '#133955',
                  }}
                >
                  Find Games!
                </Button>
              </Link>
            ) : (
              // if not logged in, allow button to launch modal
              <Button
                variant="contained"
                size="large"
                sx={{ width: '200px', height: '60px', margin: '1em' }}
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
                  {/* add signin form component to modal */}
                  <Signin />
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
        <div style={{ backgroundColor: '#292827', marginTop: '100px' }}>
          {/* adds jimmy's ultra cool image collage */}
          <QuiltedImageList />
        </div>
        <div>
          <h2
            style={{
              textAlign: 'center',
              backgroundColor: '#292827',
              color: 'white',
              fontSize: '2em',
            }}
          >
            What have users been saying?
          </h2>
          {/* map through all the entries returned from the query and display each one in an Entries component */}
          {entryData.map((entry, index) => (
            <Entries
              key={index}
              image={entry.gameData.background_image}
              game={entry.gameData.name}
              review={entry.review}
              username={entry.user.username}
              createdAt={entry.createdAt}
              genre={entry.gameData.genres}
              platform={entry.platform}
            />
          ))}
        </div>
        <div
          style={{
            marginBottom: '2em',
          }}
        ></div>
      </Container>
    </div>
  );
}
