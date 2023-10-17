import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import Card from '../Components/Card';

describe('Card Component', () => {
  test('renders a card when provided with card data', () => {
    const card = {
      image: '../src/assets/images/12.jpg',
      name: 'jaimelannister',
      id: 12,
      status: 'active',
    };

    render(<Card card={card} index={0} clickHandler={() => {}} />);
    
    const cardElement = screen.getByTestId('card');
    const cardImage = screen.getByAltText(card.name);
    
    expect(cardElement).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
  });

  test('does not render a card when not provided with card data', () => {
    const card = null;

    render(<Card card={card} index={0} clickHandler={() => {}} />);
    
    const cardElement = screen.queryByTestId('card');
    
    expect(cardElement).toBeNull();
  });

  test('calls the clickHandler when the card is clicked', () => {
    const card = {
      image: '../src/assets/images/12.jpg',
      name: 'jaimelannister',
      id: 12,
      status: 'active',
    };
    const clickHandler = jest.fn();

    render(<Card card={card} index={0} clickHandler={clickHandler} />);

    const cardElement = screen.getByTestId('card');
    fireEvent.click(cardElement);

    expect(clickHandler).toHaveBeenCalledWith(0);
  });
});
