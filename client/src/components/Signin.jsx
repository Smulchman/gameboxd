import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LOGIN_USER } from '../utils/mutations';


// const theme = createTheme();

export default function SignIn(props) {
  // const {setSignUp} = props;
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const [formState, setFormState] = useState({ email: '', password: '' });
  //need to verify the mutation actually set up
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please sign in
        </Typography>
        <Box component="form" 
        onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}
        className='input'>
          <TextField
            className="input"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={formState.email}
            sx={{bgcolor: 'white'}}
          />
          <TextField
            className="input"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            sx={{bgcolor: 'white'}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ cursor: 'wait' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" onClick={()=>setSignUp(true)} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
