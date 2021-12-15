import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ChartComponent from '../ChartComponent';

let eleWrapper: JSX.Element;

beforeEach(() => {
  eleWrapper = (
    <ChartComponent
      input={[
        {
          temp: 30,
          humidity: 60,
          wind_speed: 2.54,
          weather_description: 'overcast clouds',
          weather_name: 'Clouds',
          hour: 3,
          current_date: '12 Dec. 2021'
        },
        {
          temp: 30.5,
          humidity: 75,
          wind_speed: 2.08,
          weather_description: 'overcast clouds',
          weather_name: 'Clouds',
          hour: 6,
          current_date: '12 Dec. 2021'
        }
      ]}
      tempUnit={'0'}
    />
  )
});

afterEach(cleanup);

it('render canvas in chart component correctly', () => {
  const { container } = render(eleWrapper);
  expect(container.querySelector('canvas')).toBeInTheDocument();
})

it('matches bar chart snapshot', () => {
  const tree = renderer.create(eleWrapper).toJSON();
  expect(tree).toMatchSnapshot();
})