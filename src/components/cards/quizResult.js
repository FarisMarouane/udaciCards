import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../utils/colors';

export default ({ quizCard, cards }) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>
      Your score is {`${Math.round(quizCard.score / (cards.length - 1) * 100)}%`}
    </Text>
  </View>
);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  text: {
    color: colors.black,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
