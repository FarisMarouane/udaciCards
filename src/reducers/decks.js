const decks = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case 'ADD_CARD':
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: [...state[action.deckTitle]['questions'], action.card],
        },
      };
    case 'INITIALIZE_DECKS':
      return {
        ...state,
        ...action.decks,
      };
    default:
      return state;
  }
};

export default decks;
