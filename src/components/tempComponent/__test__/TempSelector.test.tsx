import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import TempSelector from '../TempSelector';

let eleWrapper: JSX.Element;

beforeEach(() => {
  eleWrapper = (
    <Provider store={store}>
      <TempSelector
        value={''}
        handleChange={function (
          e: React.ChangeEvent<HTMLInputElement>,
          value: string,
        ): void {
          throw new Error('Function not implemented.');
        }}
        handleRefetch={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Provider>
  );
});
afterEach(cleanup);

it('render temp selector correctly', () => {
  const { getByTestId } = render(eleWrapper);
  expect(getByTestId('temp-control')).toHaveTextContent('Fahrenheit');
  expect(getByTestId('temp-control')).toHaveTextContent('Celsius');
});

it('matches temp selector snapshot', () => {
  const tree = renderer.create(eleWrapper).toJSON();
  expect(tree).toMatchSnapshot();
})