import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducers from './reducers';
import { setLocalNotification } from './utils/helpers';
import Main from './components/main';


let store = createStore(appReducers);
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
    console.log(store);
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
