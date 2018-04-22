export const initializeListOfDecks = decks => {
  return {
    type: 'INITIALIZE_DECKS',
    decks,
  };
};

export const addDeck = title => {
  return {
    type: 'ADD_DECK',
    title,
  };
};
