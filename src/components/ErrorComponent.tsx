import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ErrorComponent({ message }: {message: string}) {
  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        border: '1px solid #f00',
        borderRadius: '0.5rem',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '0.5rem 1rem',
      }}
    >
      <p style={{
        wordWrap: 'break-word',
        width: '100%',
        textAlign: 'center',
      }}>{message}</p>
      <Button 
        sx={{
          width: '80px',
          marginTop: '1rem',
        }}
        variant="outlined" 
        color="error"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </Box>
  )
}

export default ErrorComponent;

