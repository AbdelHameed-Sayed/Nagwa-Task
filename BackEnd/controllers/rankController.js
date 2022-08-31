// Getting scoresList from data base:
let scoresList = require('./../model/TestData.json').scoresList;

module.exports.getRank = (request, response, next) => {
  // Getting student finalScore from body:
  let finalScore = request.body.finalScore;

  // The rank of the student across his/her peers in percent rounded to the nearest hundredth:
  let rank = +(
    (scoresList.filter(score => score < finalScore).length /
      scoresList.length) *
    100
  ).toFixed(2);

  try {
    response.json({ rank });
  } catch (error) {
    next(error);
  }
};
