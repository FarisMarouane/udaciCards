import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import appReducers from './reducers/index';
import { addCardToDeck, saveDeckTitle } from './utils/api';
import { setLocalNotification } from './utils/helpers';
import Main from './components/main';

const customMiddleWare = ({ getState }) => next => async action => {
  const card = action['card'];
  const deckTitle = action['deckTitle'];
  if (action.type === 'ADD_CARD') {
    try {
      await addCardToDeck(deckTitle, card);
    } catch (err) {
      console.error(err);
    }
  } else if (action.type === 'ADD_DECK') {
    try {
      await saveDeckTitle(action.title);
    } catch (err) {
      console.error(err);
    }
  }
  // console.log('Middleware triggered:', action);
  // console.log(getState());
  next(action);
};

let store = createStore(appReducers, applyMiddleware(customMiddleWare));
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Main />
        </View>
      </Provider>
    );
  }
}
