import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { Link, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

export default function SignUp(props) {
 
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };


  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

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
       {data ? (
            <h1>Success! log in on the homepage</h1>
             ) : (
      <Container component="main" maxWidth="xl">

          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '70vh',
              bgcolor: '#292827',
              color: 'white',
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: '#133955' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              // noValidate
              onSubmit={handleFormSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                    value={formState.username}
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    // add RegEx function to validate email
                    onChange={handleChange}
                    // onBlur={yeller}
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formState.password}
                    autoComplete="new-password"
                    onChange={handleChange}
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                {/* removes checkbox */}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ cursor: 'crosshair', backgroundColor: '#133955' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    to='/'
                    onClick={() => setSignUp(false)}
                    variant="body2"
                    style={{ color: 'white', textDecoration: 'underline' }}
                  >
                    {'Already have an account? Sign in on the homepage'}
                  </Link>
                
                </Grid>
              </Grid>
            </Box>
            
          </Box>
          
        </Container>
        )}
        {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
    </div>
  );
}
