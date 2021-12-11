import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import PaginationArrows from '../PaginationArrows';

let eleWrapper: JSX.Element;

beforeEach(() => {
  eleWrapper = (
    <Provider store={store}>
      <PaginationArrows
        handleLeft={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleRight={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleRefetch={function (): void {
          throw new Error('Function not implemented.');
        }}
        pageIndex={0}
        maxPage={0}
      />
    </Provider>
  )
});
afterAll(cleanup);

it('render pagination arrows correctly', () => {
  const { getByTestId } = render(eleWrapper);
  expect(getByTestId('ArrowCircleLeftIcon')).toBeTruthy();
  expect(getByTestId('ArrowCircleRightIcon')).toBeTruthy();
});

it('matches pagination arrow', () => {
  const tree = renderer.create(eleWrapper).toJSON();
  expect(tree).toMatchSnapshot();
});