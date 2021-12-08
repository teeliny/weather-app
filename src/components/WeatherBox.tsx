import React from 'react';
import Box from '@mui/material/Box';

function WeatherBox() {
  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        margin: '0 auto',
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  )
}

export default WeatherBox;

