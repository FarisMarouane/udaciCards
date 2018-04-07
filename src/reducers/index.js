import { combineReducers } from 'redux';
import decks from './decks';

const appReducers = combineReducers({
  decks,
});

export default appReducers;
