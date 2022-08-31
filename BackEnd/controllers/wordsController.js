// Getting wordList from data base:
let wordList = require('./../model/TestData.json').wordList;

// Function to get one type of PartOfSpeech:
let getOneTypeOfPartOfSpeechFunction = type =>
  wordList.filter(word => {
    return word.pos === type;
  });

let adjective = getOneTypeOfPartOfSpeechFunction('adjective');

let adverb = getOneTypeOfPartOfSpeechFunction('adverb');

let noun = getOneTypeOfPartOfSpeechFunction('noun');

let verb = getOneTypeOfPartOfSpeechFunction('verb');

// Function to get only one randomly object from a cetain type:
let getOneObjectForACertainType = type => {
  return type[Math.floor(Math.random() * type.length)];
};

// Get a random one adjective:
let oneAdjective = getOneObjectForACertainType(adjective);
// Get a random one adverb:
let oneAdverb = getOneObjectForACertainType(adverb);
// Get a random one noun:
let oneNoun = getOneObjectForACertainType(noun);
// Get a random one verb:
let oneVerb = getOneObjectForACertainType(verb);

// Sorting randomly function:
let sortingRandomlyFunction = array =>
  array.sort(() => {
    return Math.random() - 0.5;
  });

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
let RandomTenWords = sortingRandomlyFunction(RandomSixWords);

module.exports.getTenWords = (_, response, next) => {
  try {
    response.json(RandomTenWords);
  } catch (error) {
    next(error);
  }
};
