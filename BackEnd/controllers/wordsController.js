// Getting wordList from data base:
let wordList = require('./../model/TestData.json').wordList;

// Function to get one type of PartOfSpeech:
let getOneTypeOfPartOfSpeechFunction = type =>
  wordList.filter(word => {
    return word.pos === type;
  });

// Function to get only one randomly object from a cetain type:
let getOneObjectForACertainType = type => {
  return type[Math.floor(Math.random() * type.length)];
};

// Sorting randomly function:
let sortingRandomlyFunction = array =>
  array.sort(() => {
    return Math.random() - 0.5;
  });

// Get ten random words function:
const getRandomTenWords = () => {
  let adjective = getOneTypeOfPartOfSpeechFunction('adjective');

  let adverb = getOneTypeOfPartOfSpeechFunction('adverb');

  let noun = getOneTypeOfPartOfSpeechFunction('noun');

  let verb = getOneTypeOfPartOfSpeechFunction('verb');

  // Get random one adjective:
  let oneAdjective = getOneObjectForACertainType(adjective);
  // Get random one adverb:
  let oneAdverb = getOneObjectForACertainType(adverb);
  // Get random one noun:
  let oneNoun = getOneObjectForACertainType(noun);
  // Get random one verb:
  let oneVerb = getOneObjectForACertainType(verb);

  // Sorting wordList array randomly:
  let sortedWordsRandomly = sortingRandomlyFunction(wordList);

  // random six objects array that does not include the above random oneAdjective, oneAdverb, oneNoun, and oneVerb:
  let RandomSixWords = sortedWordsRandomly
    .filter(word => {
      return (
        word.word !== oneAdjective.word &&
        word.word !== oneAdverb.word &&
        word.word !== oneNoun.word &&
        word.word !== oneVerb.word
      );
    })
    .slice(0, 6);

  // Pushing the random oneAdjective, oneAdverb, oneNoun, and oneVerb into RandomSixWords array:
  RandomSixWords.push(oneAdjective, oneAdverb, oneNoun, oneVerb);

  // Random ten words array that include at least 1 adjective, 1 adverb, 1 noun, and 1 verb:
  let RandomTenWords = sortingRandomlyFunction(RandomSixWords).map(
    word => (({ id, word } = word), { id, word })
  );
  return RandomTenWords;
};

module.exports.getTenWords = (_, response, next) => {
  const RandomTenWords = getRandomTenWords();

  try {
    response.json(RandomTenWords);
  } catch (error) {
    next(error);
  }
};

module.exports.checkAnswer = (request, response, next) => {
  let studentAnswers = request.body.studentAnswers;

  let checkedAnswers = Object.values(studentAnswers).map(answer => {
    wordList.map(word => {
      if (answer.id === word.id) {
        if (answer.selectedAnswer === word.pos) {
          return (answer.isCorrect = true);
        } else {
          return (answer.isCorrect = false);
        }
      }
    });
    return answer;
  });

  try {
    response.json(checkedAnswers);
  } catch (error) {
    next(error);
  }
};
