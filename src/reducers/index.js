import { combineReducers } from 'redux';
import cards from './cards';

const appReducers = combineReducers({
  cards,
});

export default appReducers;
