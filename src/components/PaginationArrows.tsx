import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

interface IPaginationArrow {
  handleLeft: () => void;
  handleRight: () => void;
  handleRefetch: () => void;
  pageIndex: number;
  maxPage: number;
}

function PaginationArrows({ handleLeft, handleRight, handleRefetch, pageIndex, maxPage }: IPaginationArrow) {
  
  return (
    <Container
      sx={{
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
      }}
    >
      {
        <ArrowCircleLeftIcon
          sx={{ fontSize: 36.5, opacity: pageIndex === 1 ? '0.1' : '1' }}
          onClick={handleLeft}
        />
      }
      <Button
        sx={{
          textTransform: 'capitalize',
          backgroundColor: '#ffffff',
          border: '1px solid #000000',
          color: '#000000',
        }}
        onClick={handleRefetch}
      >
        Refresh
      </Button>
      {
        <ArrowCircleRightIcon
          sx={{ fontSize: 36.5, opacity: pageIndex === maxPage ? '0.1' : '1' }}
          onClick={handleRight}
        />
      }
    </Container>
  );
}

export default PaginationArrows;

