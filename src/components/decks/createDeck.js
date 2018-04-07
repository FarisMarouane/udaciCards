import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import t from 'tcomb-form-native';

import { addDeck } from '../../actions/decks';

import { saveDeckTitle } from '../../utils/api';
import colors from '../../utils/colors';

const Form = t.form.Form;

const DeckModel = t.struct({
  title: t.String,
});

const options = {
  fields: {
    title: {
      placeholder: 'Deck title',
      error: 'You have to specify a title !',
      auto: 'none',
    },
  },
};

class createDeck extends React.Component {
  static navigationOptions = {
    title: 'New Deck',
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit = () => {
    const {
      updateDeckList,
      name,
      cards,
      decks,
      updateCardsListDecksScreen,
    } =
      this.props.navigation.state.params || this.props;
    const { addDeckAction } = this.props;
    const value = this._form.getValue();
    if (value) {
      saveDeckTitle(value.title.trim());
      addDeckAction(value.title.trim());
      updateDeckList();
      this.props.navigation.navigate('Deck Detail', {
        name: value.title.trim(),
        cards: [],
        decks,
        updateDeckList,
        updateCardsListDecksScreen,
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck ?</Text>
        <Form ref={c => (this._form = c)} options={options} type={DeckModel} />
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

const mapStateToProps = state => {
  return {
    decks: state.decks,
  };
};

// Set up actions that are available to the ReminderList
const mapDispatchToProps = dispatch => {
  return {
    addDeckAction: title => {
      dispatch(addDeck(title));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 4,
  },
});
