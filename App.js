import React from 'react';
import { Text, View } from 'react-native';

import { setLocalNotification } from './components/utils/helpers';
import Main from './components/main';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return <Main />;
  }
}
