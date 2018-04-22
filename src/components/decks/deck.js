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

import colors from '../../utils/colors';

class Deck extends React.Component {
  state = {
    cards: this.props.cards,
  };

  render() {
    const {
      navigation,
      numberOfDecks,
      name,
      decks,
    } = this.props;

    const { cards } = this.props;
    const numberOfCards = cards.length;
    const { height } = Dimensions.get('window');
    const navigationBarHeight = Header.HEIGHT;

    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
            borderBottomWidth: 1,
          },
          {
            height:
              numberOfDecks === 1
                ? height - navigationBarHeight
                : numberOfDecks === 2
                  ? (height - navigationBarHeight) / 2
                  : 300,
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
            })
          }
        />
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Create Deck', {
              name,
              cards,
              decks,
            })
          }
          style={styles.touchable}
        >
          <View style={styles.addNewDeck}>
            <MaterialIcons name="add-box" size={11} color="green" />
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: colors.udacityBlue }}>
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
    color: colors.grey,
    marginTop: 5,
  },
  addNewDeck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deck;
