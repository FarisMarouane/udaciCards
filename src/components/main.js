import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import Deck from './decks/deck';
import CreateDeck from './decks/createDeck';
import DeckDetail from './decks/deckDetail';
import addCard from './cards/addCard';
import Welcome from './welcome';
import Questions from './cards/questions';

import { saveDeckTitle, getDecks, getDeck } from '../utils/api';

class Decks extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  state = {
    decks: [],
  };

  async componentDidMount() {
    await getDecks().then(data => {
      const decksBis = JSON.parse(data);
      this.setState({
        decks: Object.keys(decksBis).map(key => ({ ...decksBis[key] })),
      });
    });
  }

  updateDeckList = () =>
    getDecks().then(data => {
      const decksBis = JSON.parse(data);
      this.setState({
        decks: Object.keys(decksBis).map(key => ({ ...decksBis[key] })),
      });
    });

  render() {
    const { navigation } = this.props;
    const { decks } = this.state;
    return (
      <View style={styles.dock}>
        {decks.length > 0 ? (
          <FlatList
            data={decks}
            renderItem={({ item, index }) => (
              <Deck
                navigation={navigation}
                name={item.title}
                cards={item.questions}
                numberOfDecks={decks.length}
                updateDeckList={this.updateDeckList}
                decks={decks}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Welcome
            updateDeckList={this.updateDeckList}
            navigation={navigation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dock: {
    flex: 1,
  },
});

export default StackNavigator({
  Decks: {
    screen: Decks,
  },
  'Deck Detail': { screen: DeckDetail },
  'Add Card': { screen: addCard },
  'Create Deck': { screen: CreateDeck },
  'Questions': { screen: Questions },
});