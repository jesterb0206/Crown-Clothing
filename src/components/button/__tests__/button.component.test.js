import {render, screen} from '@testing-library/react';
import Button, {BUTTON_TYPE_CLASSES} from '../button.component';

describe('Button Tests', () => {
  test('Should Render Base Button When Nothing Is Passed', () => {
    render(<Button />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('background-color" black');
  });

  test('Should Render Google Button When Passed Google Button Type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const googleButtonElement = screen.getByRole('button');
    expect(googleButtonElement).toHaveStyle('background-color: #4285f4');
  });

  test('Should Render Inverted Button When Passed Inverted Button Type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const invertedButton = screen.getByRole('button');
    expect(invertedButton).toHaveStyle('background-color: white');
  });

  test('Should Be Disabled if isLoading Is True', () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
