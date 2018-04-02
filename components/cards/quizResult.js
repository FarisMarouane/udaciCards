import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ card, cards }) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>
      Your score is {`${Math.round(card.score / (cards.length - 1) * 100)}%`}
    </Text>
  </View>
);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
