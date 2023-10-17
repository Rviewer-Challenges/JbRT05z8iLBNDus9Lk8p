
export default function Card({ card, index, clickHandler }) {
  if (!card) {
    return null;
  }
  
  return (
    <div data-testid='card' className={`card ${card.status}`} onClick={() => clickHandler(index)}>
      <img src={card.image} alt={card.name} />
    </div>
  )
}
