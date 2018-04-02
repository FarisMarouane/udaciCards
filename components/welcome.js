import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default ({ navigation, updateDeckList }) => (
  <View style={styles.welcome}>
    <Text style={styles.welcomeMessage}>Welcome to the UdaciCards App</Text>
    <Text style={{ fontStyle: 'italic' }}>
      To get started, start by creating a new Deck of questions
    </Text>
    <TouchableOpacity
      style={styles.createDeck}
      onPress={() => navigation.navigate('Create Deck', { updateDeckList })}
    >
      <Text style={{ color: '#fff' }}>Create Deck</Text>
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
  welcomeMessage: {
    color: '#00ade7',
    fontSize: 20,
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
