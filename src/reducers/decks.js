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
      // console.log(state[action.deckTitle]);
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: [
            ...state[action.deckTitle]["questions"],
            action.card,
          ],
        },
      };
    default:
      return state;
  }
};

export default decks;
