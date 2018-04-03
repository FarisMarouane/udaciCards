import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { Header } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../utils/colors';

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      side: 'front',
    };
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };
    const { card, handleAnswer, index } = this.props;
    const { side } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.cardFront,
            frontAnimatedStyle,
            { opacity: this.frontOpacity },
            side === 'front' ? { zIndex: 2 } : { zIndex: 1 },
          ]}
        >
          <Text style={styles.text}>{card.question}</Text>
          <TouchableHighlight
            onPress={() => {
              this.flipCard();
              this.setState({ side: 'back' });
            }}
          >
            <Text style={styles.answer}>Answer</Text>
          </TouchableHighlight>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              onPress={() => {
                handleAnswer(index, 'correct');
              }}
              style={styles.correctButton}
              underlayColor={colors.buttonUnderlay}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Correct
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'green'}
              onPress={() => handleAnswer(index, 'incorrect')}
              style={styles.incorrectButton}
              underlayColor={colors.buttonUnderlay}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Incorrect
              </Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.cardBack,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('screen').height - Header.HEIGHT,
            },
            backAnimatedStyle,
            { opacity: this.backOpacity },
            side === 'back' ? { zIndex: 2 } : { zIndex: 1 },
          ]}
        >
          <Text style={styles.flipText}>{card.answer}</Text>
          <TouchableHighlight
            onPress={() => {
              this.flipCard();
              this.setState({ side: 'front' });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={20}
                color="green"
              />
              <Text style={{ fontSize: 20 }}>Go back to the question</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 30,
  },
  correctButton: {
    backgroundColor: 'green',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    width: 200,
  },
  incorrectButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    width: 200,
  },
  container: {
    flex: 1,
  },
  cardFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
  cardBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: colors.backgroundColor,
    position: 'absolute',
  },
  flipText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  text: {
    color: colors.black,
    fontSize: 30,
    fontWeight: 'bold',
  },
  answer: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
