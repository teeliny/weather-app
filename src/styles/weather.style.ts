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