// import React, { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Auth from '../utils/auth';
import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function Profile() {

  const me = Auth.getProfile();
  let myName;
  const myEmail = me.data.email;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {email: me.data.email}
  })

  if (data && !loading) {
  console.log(data);
  myName = data.user.username
  }
  console.log(myName);
  return (
    <div>
      <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome to your profile:
          </Typography>
          <Typography variant="h5" component="div">
            {myName}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            {myEmail}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
