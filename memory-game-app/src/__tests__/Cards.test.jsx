import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import {expect, jest, test} from '@jest/globals';
import Cards from '../Components/Cards';
import * as dataHelper from '../../data/helper';

jest.mock('../../data/helper');

describe('Cards Component', () => {
  
  test('renders start button', () => {
    dataHelper.getCards.mockResolvedValue([
      {
        image: '../src/assets/images/12.jpg',
        name: 'jaimelannister',
        id: 12,
        status: '',
      },
    ]);

    render(<Cards difficulty={8} />);

    const startButton = screen.getByTestId('start-game-button');

    expect(startButton).toBeInTheDocument();
  });

  test('clicking the start button starts the game', () => {
    
    dataHelper.getCards.mockResolvedValue([
      {
        image: '../src/assets/images/12.jpg',
        name: 'jaimelannister',
        id: 12,
        status: '',
      },
    ]);

    render(<Cards difficulty={8} />);

    const startButton = screen.getByTestId('start-game-button');
    fireEvent.click(startButton);
    const stopButton = screen.getByTestId('stop-game-button');
   
    expect(stopButton).toBeInTheDocument();
  });
});
