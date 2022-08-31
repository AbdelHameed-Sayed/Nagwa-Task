const express = require('express');
const router = express.Router();

// To validate and check that the finalScore in the body is not string and not empty:
const { body } = require('express-validator');
const validationMW = require('./../middlewares/validationMW');

const controller = require('../controllers/rankController');

// rank route:
router.route('/rank').post(
  // Validate finalScore:
  [
    body('finalScore')
      .notEmpty()
      .withMessage('finalScore can not be empty')
      .not()
      .isString()
      .withMessage('finalScore must be a number'),
  ],
  validationMW,

  // if succeded in validation, go to next step:
  controller.getRank
);

module.exports = router;
