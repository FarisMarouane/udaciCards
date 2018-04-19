import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';

import { getDeck } from '../../utils/api';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import colors from '../../utils/colors';

export default class DeckDetail extends React.Component {
  static navigationOptions = {
    title: 'Detail View',
  };

  state = {
    cards: this.props.navigation.state.params.cards,
  };

  updateCardsListInDetailScreen = () => {
    const { name } = this.props.navigation.state.params;
    getDeck(name)
      .then(deck => this.setState({ cards: deck[0].questions }))
      .catch(err => console.log(err));
  };

  onPress = () => {
    clearLocalNotification().then(setLocalNotification);
    const {
      cards,
      updateDeckList,
      updateCardsListDecksScreen,
      name,
    } = this.props.navigation.state.params;
    this.props.navigation.navigate('Questions', {
      cards,
      updateDeckList,
      updateCardsListDecksScreen,
      updateCardsListInDetailScreen: this.updateCardsListInDetailScreen,
      title: name,
    });
  };
  render() {
    const {
      name,
      decks,
      updateDeckList,
      updateCardsListDecksScreen,
    } = this.props.navigation.state.params;

    const { cards } = this.state;

    const numberOfCards = cards.length;
    return (
      <View style={styles.deckDetail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.cardsNumber}>{numberOfCards} cards</Text>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Add Card', {
                title: name,
                updateCardsListDecksScreen,
                updateCardsListInDetailScreen: this
                  .updateCardsListInDetailScreen,
                decks,
              })
            }
            style={styles.cardButton}
          >
            <Text>Add Card</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'green'}
            onPress={this.onPress}
            style={styles.quizzButton}
          >
            <Text style={{ color: colors.backgroundColor }}>Start Quiz</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  cardsNumber: {
    fontWeight: '100',
    color: colors.grey,
    marginTop: 5,
  },
  cardButton: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  quizzButton: {
    backgroundColor: colors.black,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  deckDetail: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
  },
});
