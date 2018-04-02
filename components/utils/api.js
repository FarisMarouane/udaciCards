import { AsyncStorage } from 'react-native';

const UdaciCardsKey = 'udaciCards';

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    UdaciCardsKey,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    }),
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(UdaciCardsKey).then(results => {
    const decks = JSON.parse(results);

    let questions = decks[title].questions;
    questions.push(card);

    const newCard = JSON.stringify({
      [title]: { title, questions },
    });

    AsyncStorage.mergeItem(UdaciCardsKey, newCard).then(err =>
      console.log(err),
    );
  });
}

export async function getDecks() {
  return AsyncStorage.getItem(UdaciCardsKey);
}

export async function getDeck(name) {
  return AsyncStorage.getItem(UdaciCardsKey).then(data => {
    const decksBis = JSON.parse(data);
        return Object.keys(decksBis).map(key => ({ ...decksBis[key] }))
        .filter(deck => deck.title === name);
  });
}
