import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import WeatherBox from '../WeatherBox';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WeatherBox
      temp={30}
      humidity={60}
      current_date={''}
      tempUnit={''}
      id={''}
      handleSelectDay={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        throw new Error('Function not implemented.');
      }}
    />,
    div,
  );
});

it('renders box correctly', () => {
  const { getByTestId } = render(
    <WeatherBox
      temp={30}
      humidity={60}
      current_date={''}
      tempUnit={''}
      id={''}
      handleSelectDay={
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          throw new Error('Function not implemented.');
        }
      }
    />
  );
  expect(getByTestId('single-box')).toHaveTextContent('Temperature');
})