import {screen} from '@testing-library/react';
import Category from '../category.component';
import {renderWithProviders} from '../../../utils/test-utils';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
}));

describe('Category Component Tests', () => {
  test('It Should Render a Spinner if isLoading Is True', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('It Should Render the Categories if isLoading Is False', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                {id: 1, name: 'Product 1'},
                {id: 2, name: 'Product 2'},
              ],
            },
          ],
        },
      },
    });

    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
