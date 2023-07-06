import {render, screen} from '@testing-library/react';
import Button, {BUTTON_TYPE_CLASSES} from '../button.component';
import '@testing-library/jest-dom/extend-expect';

describe('Button Tests', () => {
  test('Should Render Base Button When Nothing Is Passed', () => {
    render(<Button>Test</Button>);

    expect(screen.getByRole('button')).toHaveStyle('background-color: black');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('Should Be Disabled if isLoading Is True', () => {
    render(<Button isLoading={true}>Test</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('Should Render Google Button When Passed Google Button Type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);

    expect(screen.getByRole('button')).toHaveStyle('background-color: #4285f4');
  });

  test('Should Render Inverted Button When Passed Inverted Button Type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);

    expect(screen.getByRole('button')).toHaveStyle('background-color: white');
  });
});
