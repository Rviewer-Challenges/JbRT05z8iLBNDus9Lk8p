import { useState, useEffect } from 'react'
import { getCards } from '../../data/helper'
import Card from './Card'

const Cards = ({ difficulty }) => {
  const [cards, setCards] = useState([])
  const [previousCardIndex, setPreviousCardIndex] = useState(null)

  useEffect(() => {
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
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
      });
    }, [difficulty]);

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
  };

  const renderCards = () => {
    return cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          clickHandler={clickHandler}
        />
      ));
  };

  const containerClassName =
    difficulty === 8 ? 'container easy' :
    difficulty === 12 ? 'container medium' :
    difficulty === 15 ? 'container hard' : 'container grid';

  return (
    <div className={containerClassName}>
      {renderCards()}
    </div>
  );
};

export default Cards;