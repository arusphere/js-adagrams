const LETTER_POOL = {
  A:9,
  B:2,
  C:2,
  D:4,
  E:12,
  F:2,
  G:3,
  H:2,
  I:9,
  J:1,
  K:1,
  L:4,
  M:2,
  N:6,
  O:8,
  P:2,
  Q:1,
  R:6,
  S:4,
  T:6,
  U:4,
  V:2,
  W:2,
  X:1,
  Z:1,
};

const SCORE_POOL = {
  A:1,
  B:3,
  C:3,
  D:2,
  E:1,
  F:4,
  G:2,
  H:4,
  I:1,
  J:8,
  K:5,
  L:1,
  M:3,
  N:1,
  O:1,
  P:3,
  Q:10,
  R:1,
  S:1,
  T:1,
  U:1,
  V:4,
  W:4,
  X:8,
  Y:4,
  Z:10,
};

export const drawLetters = () => {
  // Implement this method for wave 1
  
  const letterInHand = []
  for (const [letter, frequency] of Object.entries(LETTER_POOL)) {
      for (let i = 0; i < frequency; i++) {
          letterInHand.push(letter)
      }
  }

  const hand = []

  for (let i = 0; i < 10; i++) {
      const letterkeys = letterInHand[Math.floor(Math.random() * letterInHand.length)]
      hand.push(letterkeys)
      let letterIndex = letterInHand.indexOf(letterkeys)
      letterInHand.splice(letterIndex, 1)
  }
  return hand
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2

  const capsInput = input.toUpperCase();

  for (const letter of capsInput) {
      if (lettersInHand.includes(letter)) {
          const letterIndex = lettersInHand.indexOf(letter)
          lettersInHand.splice(letterIndex, 1)
      } else {
          return false
        }
  }
  return true
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  let capsWord = word.toUpperCase();
  let score = 0;
      
  for (const letter of capsWord){
    score += SCORE_POOL[letter];
  }
      
  if (capsWord.length >= 7 && capsWord.length <= 10){
    score += 8;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4

  const n = words.length;
  let bestScore = {
      word: "",
      score: null,
  };

  for (let i = 0; i < n; i++) {
      if (scoreWord(words[i]) > bestScore.score) {
          bestScore = {
              word: words[i],
              score: scoreWord(words[i]),
          };
      } else if (scoreWord(words[i]) === bestScore.score) {
          if (bestScore.word.length === 10) {
              bestScore = bestScore;
          } else if (words[i].length === 10) {
              bestScore = {
                  word: words[i],
                  score: scoreWord(words[i]),
              };
          } else if (words[i].length < bestScore.word.length) {
              bestScore = {
                  word: words[i],
                  score: scoreWord(words[i]),
              };
          }
      }
  };
  return bestScore
};
