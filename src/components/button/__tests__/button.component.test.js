import {render, screen} from '@testing-library/react';
import Button from '../button.component';

describe('Button Tests', () => {
  test('Should Render Base Button When Nothing Is Passed', () => {
    render(<Button />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('background-color" black');
  });
});
