import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useAppSelector } from '../../app/hooks';
import { IPaginationArrow } from './pagination.typing';

function PaginationArrows({ handleLeft, handleRight, handleRefetch, pageIndex, maxPage }: IPaginationArrow) {
  const myView = useAppSelector((state) => state.screen.mobile_view);
  return (
    <Container
      sx={{
        position: 'absolute',
        top: myView ? '' : '175px',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '0',
        paddingRight: '0',
        margin: '0',
      }}
    >
      {
        <ArrowCircleLeftIcon
          sx={{ fontSize: 36.5, opacity: pageIndex === 1 ? '0.1' : '1' }}
          onClick={handleLeft}
        />
      }
      {myView && (
        <Button
          sx={{
            textTransform: 'capitalize',
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
            color: '#000000',
            width: '80px',
          }}
          onClick={handleRefetch}
        >
          Refresh
        </Button>
      )}
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

