import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import WeatherBox from '../WeatherBox';

let eleWrapper: JSX.Element;

beforeEach(() => {
  eleWrapper = (
    <WeatherBox
      temp={30}
      weather_description={'overcast clouds'}
      weather_name={'Clouds'}
      selectedDay={'0'}
      current_date={''}
      tempUnit={''}
      id={''}
      handleSelectDay={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        throw new Error('Function not implemented.');
      }}
    />
  );
})

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(eleWrapper, div);
});

it('renders box correctly', () => {
  const { getByTestId } = render(eleWrapper);
  expect(getByTestId('single-box')).toHaveTextContent('Temperature');
});

it('matches weather box snapshot', () => {
  const tree = renderer.create(eleWrapper).toJSON();
  expect(tree).toMatchSnapshot();
});