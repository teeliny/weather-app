import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function PaginationArrows() {
  return (
    <Container sx={{
      minWidth: "100%",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
    }}>
      <ArrowCircleLeftIcon sx={{ fontSize: 36.5 }} />
      <Button variant="outlined">Refresh</Button>
      <ArrowCircleRightIcon sx={{ fontSize: 36.5 }} />
    </Container>
  )
}

export default PaginationArrows;

