import React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { convertTemp } from '../utils/basicFormatter';

const InnerDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IWeatherBox {
  temp: number;
  humidity: number;
  current_date: string;
  tempUnit: string;
}

function WeatherBox({temp, humidity, current_date, tempUnit}: IWeatherBox) {
  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #000000',
      }}
    >
      <p>Temperature</p>
      <InnerDiv>
        <p>{(convertTemp(tempUnit, temp)).toFixed(2)} {tempUnit === '0' ? 'C' : 'F'}</p>
        <p>{humidity.toFixed(0)}</p>
      </InnerDiv>
      <p>{current_date}</p>
    </Box>
  )
}

export default WeatherBox;

