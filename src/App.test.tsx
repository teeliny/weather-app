import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app', () => {
  render(<App />);
  const linkElement = screen.getByText(/temp/i);
  expect(linkElement).toBeInTheDocument();
});
