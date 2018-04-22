import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Deck from './decks/deck';
import CreateDeck from './decks/createDeck';
import DeckDetail from './decks/deckDetail';
import addCard from './cards/addCard';
import Welcome from './welcome';
import Questions from './cards/questions';

import { saveDeckTitle, getDecks, getDeck } from '../utils/api';
import { initializeListOfDecks } from '../actions/decks';
import { transformIntoArray } from '../utils/helpers';

class Decks extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  state = {
    decks: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      decks: { ...this.state.decks, ...nextProps.decks },
    });
  }

  componentDidMount() {
    getDecks().then(data => {
      const decksBis = JSON.parse(data);
      this.props.initializeListOfDecks(decksBis);
    });
  }

  render() {
    const { navigation } = this.props;
    const decks = transformIntoArray(this.state.decks);
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
                decks={decks}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Welcome navigation={navigation} />
        )}
      </View>
    );
  }
}

const mapStateToProps = store => {
  return {
    decks: store.decks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeListOfDecks: decks => dispatch(initializeListOfDecks(decks)),
  };
};

const DecksWithReduxStore = connect(mapStateToProps, mapDispatchToProps)(Decks);

const styles = StyleSheet.create({
  dock: {
    flex: 1,
  },
});

export default StackNavigator(
  {
    Decks: {
      screen: DecksWithReduxStore,
    },
    'Deck Detail': { screen: DeckDetail },
    'Add Card': { screen: addCard },
    'Create Deck': { screen: CreateDeck },
    Questions: { screen: Questions },
  },
  {
    initialRouteName: 'Decks',
  },
);
