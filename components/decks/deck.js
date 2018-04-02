import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { Header } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import { getDeck } from '../utils/api';

class Deck extends React.Component {
  state = {
    cards: this.props.cards,
  };

  updateCardsListDecksScreen = () =>
    getDeck(this.props.name)
      .then(deck => this.setState({ cards: deck[0].questions }))
      .catch(err => console.log(err));
      
  render() {
    const {
      navigation,
      updateDeckList,
      numberOfDecks,
      name,
      decks,
    } = this.props;

    const { cards } = this.state;
    const numberOfCards = cards.length;
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderBottomWidth: 1,
          },
          {
            height: 300,
          },
        ]}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.cardsNumber}>{numberOfCards} cards</Text>
        <Button
          title={'See detail'}
          onPress={() =>
            navigation.navigate('Deck Detail', {
              name,
              cards,
              decks,
              updateDeckList,
              updateCardsListDecksScreen: this.updateCardsListDecksScreen,
            })
          }
        />
        <TouchableHighlight
          onPress={() => navigation.navigate('Create Deck', { updateDeckList })}
          style={styles.touchable}
        >
          <View style={styles.addNewDeck} >
            <MaterialIcons name="add-box" size={11} color="green" />
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: 'blue' }}>
              Or add a new deck
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const Detail = () => <h1>Detail Page</h1>;

const styles = StyleSheet.create({
  touchable: {
    marginTop: 10,
  },
  name: {
    fontSize: 18,
  },
  cardsNumber: {
    fontWeight: '100',
    color: '#9e9e9e',
    marginTop: 5,
  },
  addNewDeck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deck;