import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';


function LoadingComponent() {
  return (
    <Container
      data-testid="loading"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Container>
  );
}

export default LoadingComponent;

