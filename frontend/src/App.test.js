import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trading AI Platform header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trading AI Platform/i);
  expect(linkElement).toBeInTheDocument();
});