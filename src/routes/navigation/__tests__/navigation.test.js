import {screen} from '@testing-library/react';
import Navigation from '../navigation.component';
import {renderWithProviders} from '../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('Navigation Tests', () => {
  test('It Should Render a Sign in Link if There Is No currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

  test('It Should Not Render a Sign in Link if There Is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.queryByText('SIGN IN')).toBeNull();
  });

  test('It Should Render a Sign Out Link if There Is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
  });

  test('It Should Render Cart Dropdown if isCartOpen Is True', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  test('It Should Not Render Cart Dropdown if isCartOpen Is False', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    expect(screen.queryByText('Your cart is empty!')).toBeNull();
  });
});
