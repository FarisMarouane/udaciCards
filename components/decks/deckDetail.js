import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';

import { getDeck } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import calculateScore from '../utils/calculateScore';

export default class DeckDetail extends React.Component {
  static navigationOptions = {
    title: 'Detail View',
  };

  state = {
    cards: this.props.navigation.state.params.cards,
    questionsAnswered: {},
  };

  updateCardsListInDetailScreen = () => {
    const { name } = this.props.navigation.state.params;
    getDeck(name)
      .then(deck => this.setState({ cards: deck[0].questions }))
      .catch(err => console.log(err));
  };

  updateInitialInCardsList = async () => {
    // So questions swiper displays latest added card
    const resultCard = {
      score: calculateScore(this.state.questionsAnswered),
    };
    await getDeck(this.props.name)
      .then(deck =>
        this.setState({ cards: [...deck[0].questions, resultCard] }),
      )
      .catch(err => console.log(err));
  };

  handleAnswer = (index, answer) =>
    this.setState(prevState => {
      return {
        questionsAnswered: {
          ...prevState.questionsAnswered,
          [index]: answer,
        },
      };
    });

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
      handleAnswer: this.handleAnswer,
      questionsAnswered: this.state.questionsAnswered,
      updateDeckList,
      updateInitialInCardsList: this.updateInitialInCardsList,
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
                updateDeckList,
                updateInitialInCardsList: this.updateInitialInCardsList,
                updateCardsListDecksScreen,
                updateCardsListInDetailScreen: this
                  .updateCardsListInDetailScreen,
                cards,
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
            <Text style={{ color: 'white' }}>Start Quiz</Text>
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
    color: '#9e9e9e',
    marginTop: 5,
  },
  cardButton: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  quizzButton: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  deckDetail: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
  },
});
