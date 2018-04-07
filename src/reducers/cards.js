const cards = (state = {}, action) => {
  switch(action) {
    case "ADD_CARDS":
      return {
        ...state,
        [action.card.title]: action.card,
      }
      default:
        return state;
  }
}

export default cards;