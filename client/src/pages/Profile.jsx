// import React, { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Auth from '../utils/auth';



export default function Profile() {

  const me = Auth.getProfile();
  console.log(me);

  return (
    <>
      <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome:
          </Typography>
          <Typography variant="h5" component="div">
            UserName
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            email
          </Typography>
          {/* <Typography variant="body2">Maybe Avatar</Typography> */}
        </CardContent>
      </Card>
    </>
  );
}
