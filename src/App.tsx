import React, { lazy, Suspense, useEffect } from 'react';
import LoadingComponent from './pages/loadingPage/LoadingScreen';
import { useAppDispatch } from './app/hooks';
import { toggleView } from './features/screen/screen-width-slice';
import { useWindowSize } from './utils/formatter/basicFormatter';

const WeatherScreen = lazy(() => import('./pages/weatherPage/WeatherScreen'));

function App() {
  const dispatch = useAppDispatch();
  const screenWidth = useWindowSize();

  // Check screen size and use it to set page size
  useEffect(() => {
    if (screenWidth < 600) {
      dispatch(toggleView(1));
    } else if(screenWidth >= 600 && screenWidth < 900 ) {
      dispatch(toggleView(2));
    } else {
      dispatch(toggleView(3));
    }
  }, [dispatch, screenWidth]);
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingComponent />}>
        <WeatherScreen />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
