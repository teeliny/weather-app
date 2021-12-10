import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TempWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 769px) {
    width: 80%;
  }
  @media (min-width: 971px) {
    width: 70%;
  }
`;

export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: '8px';
  align-items: center;
  margin: 3rem auto;

  @media (min-width: 769px) {
    width: 80%;
  }
  @media (min-width: 971px) {
    width: 70%;
  }
`;

export const ChartWrapper = styled.div`
  height: 300px;
  width: 90%;
  margin: 0 auto;

  @media (min-width: 769px) {
    width: 60%;
  }
  @media (min-width: 971px) {
    width: 40%;
  }
`;

export const MainWrapper = styled.div`
  position: relative;
  margin: 0 1rem;

  @media (min-width: 769px) {
    margin: 0 3rem;
  }

  @media (min-width: 1025px) {
    margin: 0 10rem;
  }
`;