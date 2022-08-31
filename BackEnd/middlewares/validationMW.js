const { validationResult } = require('express-validator');

module.exports = (request, _, next) => {
  // To validate the request:
  let result = validationResult(request);

  // If there is error:
  if (!result.isEmpty()) {
    let message = result.errors.reduce((accumulator, current) => {
      return accumulator + current.msg + ', ';
    }, '');

    let error = new Error(message);

    error.status = 422; // validation error
    throw error;
  } else next();
};
