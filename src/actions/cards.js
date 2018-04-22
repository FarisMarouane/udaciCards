export const addCard = (deckTitle, card) => {
  return {
    type: 'ADD_CARD',
    deckTitle,
    card,
  };
};
