import React from 'react';
import { render } from '@testing-library/react';
import { expect, test } from '@jest/globals';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeTruthy();
});
