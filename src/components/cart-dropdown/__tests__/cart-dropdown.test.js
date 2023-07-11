import {screen, fireEvent} from '@testing-library/react';
import CartDropdown from '../cart-dropdown.component';
import {renderWithProviders} from '../../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Cart Dropdown Tests', () => {
  test('It Should Render an Empty Message if No Products Are Present', () => {
    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: [],
        },
      },
    });

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  test('It Should Render Items in Dropdown if Items Are Present', () => {
    const initialCartItems = [
      {id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1},
      {id: 2, name: 'Item B', imageUrl: 'test', price: 20, quantity: 2},
    ];

    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    expect(screen.queryByText('Your cart is empty!')).toBeNull();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  test('Go to Checkout Button Should Navigate to Checkout Page', () => {
    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: [],
        },
      },
    });

    const button = screen.queryByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});
