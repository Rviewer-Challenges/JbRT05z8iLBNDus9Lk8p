
export default function Card({ card, index, clickHandler }) {

  return (
    <div className={`card ${card.status}`} onClick={() => clickHandler(index)}>
      <img src={card.image} alt={card.name} />
    </div>
  )
}
