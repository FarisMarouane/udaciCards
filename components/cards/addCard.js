import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import t from 'tcomb-form-native';

import { addCardToDeck } from '../utils/api';

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

  handleSubmit = async () => {
    const {
      title,
      updateInitialInCardsList,
      updateCardsListDecksScreen,
      updateCardsListInDetailScreen,
      cards,
      decks,
    } = this.props.navigation.state.params;
    const value = this._form.getValue();
    if (value !== null) {
      const trimmedValue = {
        question: value.question.trim(),
        answer: value.answer.trim(),
      };
      await addCardToDeck(title, trimmedValue);
      await updateInitialInCardsList();
      await updateCardsListInDetailScreen();
      await updateCardsListDecksScreen();
      this.props.navigation.goBack();
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
    backgroundColor: '#ffffff',
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

export default Card;
