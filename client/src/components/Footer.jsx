import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '5vh',
        bgcolor: '#292827',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        borderTop: 2,
        borderColor: 'white',
      }}
    >
      <CssBaseline />

      <Container maxWidth="sm">
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: 0.5,
          }}
        >
          <InstagramIcon /> <TwitterIcon /> <FacebookIcon /> <YouTubeIcon />
        </Typography>
      </Container>
    </Box>
  );
}
