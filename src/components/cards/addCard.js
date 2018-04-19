import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import t from 'tcomb-form-native';

import { addCard } from '../../actions/cards';
import { addCardToDeck, getDeck } from '../../utils/api';
import colors from '../../utils/colors';

const Form = t.form.Form;

const CardModel = t.struct({
  question: t.String,
  answer: t.String,
});

const options = {
  auto: 'placeholders',
  fields: {
    question: {
      error: 'You have to specify a question !',
    },
    answer: {
      error: 'You have to provide an answer to the previous question',
    },
  },
};

class Card extends React.Component {
  static navigationOptions = {
    title: 'Add Card',
  };

  componentDidMount() {
    // console.log(this.props);
  }

  handleSubmit = async () => {
    const {
      title,
      updateCardsListDecksScreen,
      updateCardsListInDetailScreen,
      updateDeckList,
      decks,
    } =
      this.props.navigation.state.params;
    const { addCardAction } = this.props;  
    const value = this._form.getValue();
    if (value !== null) {
      const trimmedValue = {
        question: value.question.trim(),
        answer: value.answer.trim(),
      };
      addCardAction(title, trimmedValue);
      
      // await addCardToDeck(title, trimmedValue);
      await updateCardsListInDetailScreen();
      await updateCardsListDecksScreen();

      const updatedCardsList = [];

      await getDeck(title)
        .then(deck => {
          updatedCardsList = [...deck[0].questions];
        })
        .catch(err => console.log(err));

      this.props.navigation.navigate('Deck Detail', {
        name: title,
        cards: updatedCardsList,
        decks,
        updateDeckList,
        updateCardsListDecksScreen,
      });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Text style={styles.title}>Enter your question and answer below</Text>
        <Form ref={c => (this._form = c)} options={options} type={CardModel} />
        <View style={{ alignItems: 'center' }}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
          </TouchableHighlight>
        </View>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '30%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 4,
  },
});

const mapStateToProps = state => {
  return {
    decks: state.decks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCardAction: (deckTitle, card) => {
      dispatch(addCard(deckTitle, card));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
