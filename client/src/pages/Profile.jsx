// import React, { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Profile() {
  return (
    <>
      <div
        style={{
          bgcolor: '#292827',
          color: 'white',
          vh: 100,
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: '#292827',
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              Welcome:
            </Typography>
            <Typography variant="h5" component="div" color="white">
              UserName
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white">
              email
            </Typography>
            <Typography variant="body2" color="white">
              Maybe Avatar
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
