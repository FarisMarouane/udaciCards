import React from 'react';
import { Text, View } from 'react-native';

import Swiper from 'react-native-swiper';
import Card from './card';
import QuizResult from './quizResult';
import EmptyDeck from './emptyDeck';
import calculateScore from '../utils/calculateScore';

export default class Questions extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const length = params.cards.length;
    const index = params.index;

    return {
      title: index + 1 <= length ? `${index + 1}/${length}` : `Your Score`,
    };
  };

  state = {
    total: this.props.navigation.state.params.cards.length,
    cards: [],
  };

  componentWillMount() {
    this.props.navigation.setParams({ index: 0 });
    const { cards } = this.props.navigation.state.params;

    const resultCard = { score: 0 };
    const cardsWithResult = [...cards, resultCard];
    this.setState({ cards: cardsWithResult });
  }

  handleIndexChange = index => {
    this.props.navigation.setParams({ index });

    if (index === this.props.navigation.state.params.cards.length - 1) {
      const { cards, questionsAnswered } = this.props.navigation.state.params;
      const resultCard = {
        score: calculateScore(questionsAnswered),
      };
      const cardsWithResult = [...cards, resultCard];
      this.setState({ cards: cardsWithResult });
    }
  };

  render() {
    const { cards } = this.state;
    const { navigation } = this.props;
    const {
      updateCardsListInDetailScreen,
      updateCardsListDecksScreen,
      updateInitialInCardsList,
      handleAnswer,
    } = this.props.navigation.state.params;
    console.log(cards);

    return (
      <Swiper
        onIndexChanged={index => this.handleIndexChange(index)}
        showsButtons={true}
        loop={false}
      >
        {cards.length > 1 ? (
          cards.map((card, i) => {
            if (i < cards.length - 1) {
              return (
                <Card
                  key={Math.random().toString()}
                  card={card}
                  index={i}
                  handleAnswer={handleAnswer}
                />
              );
            }
            return (
              <QuizResult
                key={Math.random().toString()}
                card={card}
                cards={cards}
              />
            );
          })
        ) : (
          <EmptyDeck
            navigation={navigation}
            updateInitialInCardsList={updateInitialInCardsList}
            updateCardsListDecksScreen={updateCardsListDecksScreen}
            updateCardsListInDetailScreen={updateCardsListInDetailScreen}
          />
        )}
      </Swiper>
    );
  }
}