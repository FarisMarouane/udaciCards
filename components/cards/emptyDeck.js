import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
          updateCardsListInDetailScreen,
          title,
        } = navigation.state.params;
        navigation.navigate('Add Card', {
          updateDeckList,
          updateInitialInCardsList,
          updateCardsListDecksScreen,
          updateCardsListInDetailScreen,
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
    backgroundColor: '#fff',
  },
  createDeck: {
    marginTop: 10,
    padding: 3,
    width: '50%',
    backgroundColor: '#3475d3',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
  },
});
