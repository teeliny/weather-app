import React from 'react';
import Box from '@mui/material/Box';
import { convertTemp } from '../../utils/formatter/basicFormatter';
import { CardWrapper } from './weather.style';
import { IWeatherBox } from './weather.typing';

function WeatherBox({temp, humidity, current_date, tempUnit, id, handleSelectDay}: IWeatherBox) {
  return (
    <Box
      id={id}
      sx={{
        width: 120,
        height: 120,
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #000000',
      }}
      onClick={handleSelectDay}
    >
      <p>Temperature</p>
      <CardWrapper>
        <p>{(convertTemp(tempUnit, temp)).toFixed(2)} {tempUnit === '0' ? 'C' : 'F'}</p>
        <p>{humidity.toFixed(0)}</p>
      </CardWrapper>
      <p>{current_date}</p>
    </Box>
  )
}

export default WeatherBox;
