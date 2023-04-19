// header with hero image/ logo and name
import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import reactLogo from '../assets/react.svg';
import Signin from '../components/Signin.jsx';
// modal stuff
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import SignUp from './Signup';
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
  const [signUp, setSignUp] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: '#292827', height: '50vh' }}>
        <img src={reactLogo} width="100%" height="100%" />
      </Box>

      {/* modal stuff starts */}

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
    </Container>
  );
}
// if the user is not signed in, the signin button is displayed
// signin button triggers modal popup which contains signin form.
