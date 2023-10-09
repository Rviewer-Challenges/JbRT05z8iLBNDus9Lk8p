import { useState, useEffect } from 'react'
import { getCards } from '../../data/helper'
import Card from './Card'

export default function Cards() {
  const [cards, setCards] = useState([])
  const [previousCardIndex, setPreviousCardIndex] = useState(null)

  useEffect(() => {
    getCards()
      .then(data => {

        const duplicatedCards = data.reduce((acc, card) => {
          acc.push({ ...card });
          acc.push({ ...card });
          return acc;
        }, []);

        const shuffledCards = shuffleArray(duplicatedCards);

        setCards(shuffledCards);
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
      });
  }, [])

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
    setCards([...cards]);
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
    setCards([...cards]);
  };

  return (
    <div className="container">
      {cards.map((card, index) => {
        return <Card 
          key={index} 
          card={card} 
          index={index} 
          clickHandler={clickHandler}
        />
      })}
    </div>
  )
}
