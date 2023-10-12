import Card from './Card';

const CardGrid = ({ cards, clickHandler, gameStarted, difficulty }) => {

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 8:
        return 'easy';
      case 12:
        return 'medium';
      case 15:
        return 'hard';
      default:
        return 'grid';
    }
  }

  const containerClassName = `container ${getDifficultyClass(difficulty)}`

  // const containerClassName =
  //   difficulty === 8 ? 'container easy' :
  //   difficulty === 12 ? 'container medium' :
  //   difficulty === 15 ? 'container hard' : 'container grid';

  return ( 
    <div className={containerClassName}>
      {cards.map((card, index) => (
        <Card key={index} card={card} index={index} clickHandler={clickHandler} gameStarted={gameStarted} />
      ))}
    </div>
  );
}
  
export default CardGrid;
