import { useState, useEffect } from 'react'
import { getCards } from '../../data/helper'
import Timer from './Timer'
import MoveCounter from './MoveCounter'
import CardGrid from './CardGrid'
import RemainingPairs from './RemainingPairs'

const Cards = ({ difficulty }) => {
  const [cards, setCards] = useState([])
  const [previousCardIndex, setPreviousCardIndex] = useState(null)
  const [moveCount, setMoveCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [remainingPairs, setRemainingPairs] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const handleTimeout = () => {
    if (timeLeft === 0) {
      stopGame();
    } else {
      setTimeLeft(timeLeft - 1);
    }
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setMoveCount(0);
      setRemainingPairs(0);
      setTimeLeft(60);
    }
  };

  const stopGame = () => {
    setGameStarted(false);
  };

  useEffect(() => {
    if(gameStarted) {
    getCards()
      .then(data => {
        const duplicatedCards = [];
        const uniqueCards = data.slice(0, difficulty);
        for (let i = 0; i < uniqueCards.length; i++) {
          duplicatedCards.push({ ...uniqueCards[i] });
          duplicatedCards.push({ ...uniqueCards[i] });
        }
        const shuffledCards = shuffleArray(duplicatedCards);
        setCards(shuffledCards);
        setRemainingPairs(difficulty);
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
      });
    }
  }, [difficulty, gameStarted]);
 
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const matchCheck = (currentCardIndex) => {
    const currentCard = cards[currentCardIndex];
    const previousCard = cards[previousCardIndex];

    if (currentCard.id === previousCard.id) {      
      currentCard.status = 'active matched';
      previousCard.status = 'active matched';

      setRemainingPairs(remainingPairs - 1);

      if(remainingPairs === 1){
        alert('Congratulations! You have won.');
        stopGame();
      }
    }  else {      
      currentCard.status = 'active';
      
      setTimeout(() => {
       
        currentCard.status = 'unmatched';
        previousCard.status = 'unmatched';

        const updatedCards = [...cards];

        updatedCards[currentCardIndex] = currentCard;
        updatedCards[previousCardIndex] = previousCard;

        setCards(updatedCards);
      }, 1000);
    }
    setPreviousCardIndex(null);
  };

  const clickHandler = (index) => {
    if (!gameStarted) {
      return; 
    }
     
    if (index !== previousCardIndex) {
      if (cards[index].status === 'active matched') {
        alert('Card already matched.');
      } else if (previousCardIndex === null) {
        cards[index].status = 'active';
        setPreviousCardIndex(index);
      } else {
        matchCheck(index);
      }
    } else {
      alert('Card is currently selected.');
    }

    setMoveCount(moveCount + 1);
  };

  return (
    <>
      <div className="btncontainer">
        <button onClick={startGame} disabled={gameStarted} data-testid="start-game-button">
          Start Game
        </button>
        <button onClick={stopGame} disabled={!gameStarted} data-testid="stop-game-button">
          Stop Game
        </button>
      </div>
      
      <div className="countcontainer">
        <Timer timeLeft={timeLeft} gameStarted={gameStarted} handleTimeout={handleTimeout} stopGame={stopGame} />
        <RemainingPairs remainingPairs={remainingPairs} />
        <MoveCounter moveCount={moveCount} />
      </div>

      <CardGrid cards={cards} clickHandler={clickHandler} gameStarted={gameStarted} difficulty={difficulty}/>
    </>
  );
};

export default Cards;
