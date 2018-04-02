export default function calculateScore (questionsAnswered) {
  let score = 0;
  Object.keys(questionsAnswered).forEach(index => {
    if(questionsAnswered[index] === 'correct') score += 1;
  });

  return score;

}