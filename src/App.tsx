import React, { lazy, Suspense, useEffect } from 'react';
import LoadingComponent from './pages/LoadingScreen';
import { useAppDispatch } from './app/hooks';
import { toggleView } from './features/screen-width-slice';
import { useWindowSize } from './utils/basicFormatter';

const WeatherScreen = lazy(() => import('./pages/WeatherScreen'));

function App() {
  const dispatch = useAppDispatch();
  const screenWidth = useWindowSize();

  // Check screen size and use it to set page size
  useEffect(() => {
    if (screenWidth > 768) {
      dispatch(toggleView(false));
    } else {
      dispatch(toggleView(true));
    }
  }, [dispatch, screenWidth]);
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingComponent />}>
        <p>Weather App from Payoneer</p>
        <WeatherScreen />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
