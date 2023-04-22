// import React, { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Auth from '../utils/auth';
import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';


export default function Profile() {
  // decode JWT token
  const me = Auth.getProfile();
  // initiate variable to store name from query results
  let myName;
  // nested two layers in is email 
  const myEmail = me.data.email;
  // get user by email query
  const userQuery = useQuery(GET_USER, {
    variables: {email: me.data.email}
  })
  // check if the'res data (if query worked) and set name variable 
  if (userQuery.data && !userQuery.loading) {
  console.log(userQuery.data);
  myName = userQuery.data.user.username
  }

  // the JSX
  return (
    <div
    style={{backgroundColor: '#282827', height: '100vh', padding: '1em'}} 
    >
      <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}
      style={{backgroundColor: '#282827', color: 'white', border: '2px solid white'}}
      >
        <CardContent>
          <h2>
            Welcome to your profile:
          </h2>
          <h2>
            {myName}
          </h2>
          <h3>
            {myEmail}
          </h3>
        </CardContent>
      </Card>
      <div>

        
      </div>

    </div>
  );
}
