import React, {lazy, Suspense} from 'react';
// import styled from '@emotion/styled';
// const MainWrapper = styled.div`
//   margin: 0 1rem;
// `;
const WeatherScreen = lazy(() => import('./pages/WeatherScreen'));

function App() {
  return (
    
    <div style={{ width: '100%' }}>
      <Suspense fallback={'...loading'}>
        <p>Weather App from Payoneer</p>
        <WeatherScreen />
      </Suspense>
    </div>
  );
}

export default App;
