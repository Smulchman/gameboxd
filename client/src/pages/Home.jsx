// if the user is not signed in, the signin button is displayed
// signin button triggers modal popup which contains signin form.

// header with hero image/ logo and name
import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import reactLogo from '../assets/react.svg';
import Signin from '../components/Signin.jsx';
// modal stuff
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// need to figure out dif between gamebox and getgame
import QuiltedImageList from '../components/gamebox';
// import Typography from '@mui/material/Typography';

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
  return (
    <Container maxWidth="xl" style={{ height: '85vh' }}>
      <Box sx={{ bgcolor: '#292827', height: '50vh' }}>
        <img src={reactLogo} width="100%" height="100%" />
      </Box>

      {/* modal stuff starts */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#292827',
          width: '100%',
          color: 'white',
          marginTop: 5,
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
          <Button
            variant="contained"
            size="large"
            sx={{ width: '200px', height: '60px' }}
            onClick={handleOpen}
          >
            Get Started!
          </Button>
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
      <QuiltedImageList />
    </Container>
  );
}
// if the user is not signed in, the signin button is displayed
// signin button triggers modal popup which contains signin form.
