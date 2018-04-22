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

export async function addCardToDeck(title, card) {
  const results = await AsyncStorage.getItem(UdaciCardsKey);

  const decks = JSON.parse(results);

  let questions = decks[title].questions;
    questions.push(card);

  const newCard = JSON.stringify({
      [title]: { title, questions },
    });

  try {
    AsyncStorage.mergeItem(UdaciCardsKey, newCard);
  } 
  catch(err) {
    console.log(err);
  } 
}

export function getDecks() {
  return AsyncStorage.getItem(UdaciCardsKey);
}
