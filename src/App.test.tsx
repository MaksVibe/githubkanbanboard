import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import App from './App';
import { store } from './redux/store';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
