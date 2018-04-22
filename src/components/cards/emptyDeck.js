import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../utils/colors';

export default ({
  navigation,
  updateInitialInCardsList,
  updateCardsListInDetailScreen,
  updateCardsListDecksScreen,
}) => (
  <View style={styles.welcome}>
    <Text>Start by adding a few card questions</Text>
    <TouchableOpacity
      style={styles.createDeck}
      onPress={() => {
        const {
          updateDeckList,
          title,
        } = navigation.state.params;
        navigation.navigate('Add Card', {
          updateDeckList,
          updateInitialInCardsList,
          updateCardsListDecksScreen,
          title,
        });
      }}
    >
      <Text style={{ color: '#fff' }}>Add Card</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  createDeck: {
    marginTop: 10,
    padding: 3,
    width: '50%',
    backgroundColor: colors.udacityBlue,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
  },
});
