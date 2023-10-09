
export const getCards = () => {

  return fetch("./data/cards.json")
    .then((response) => response.json())
}
