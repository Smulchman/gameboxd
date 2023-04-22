import React, { useState, useEffect } from 'react';
import getGamePic from '../utils/hero.js';
import { Box } from '@mui/material';

export default function heroImage() {
  const [heroImg, setHeroImg] = useState('');
  useEffect(() => {
    setHeroImg(getGamePic());
  }, []);

  const boxStyle = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
  };

  return <Box sx={boxStyle}></Box>;
}
