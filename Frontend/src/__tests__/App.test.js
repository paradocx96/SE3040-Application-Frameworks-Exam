import React from 'react';
import { prettyDOM, render, screen } from '@testing-library/react';
import App from '../App';

test("Renders without crashing! and Text matched!", () => {
  render(<App />);
  //   console.log(prettyDOM());
  expect(screen.getByText('Application Frameworks')).toBeInTheDocument();
  expect(screen.getByText('Final Paper - 2021')).toBeInTheDocument();
});