import {screen} from '@testing-library/react';
import CartIcon from '../cart-icon.component';
import {renderWithProviders} from '../../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Cart Icon Tests', () => {
  test('Uses Preloaded State to Render', () => {
    const initialCartItems = [
      {id: 1, name: 'Item A', imageUrl: 'Test', price: 10, quantity: 1},
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    const CartLogo = screen.getByText('1');
    expect(CartLogo).toHaveTextContent('1');
  });
});
