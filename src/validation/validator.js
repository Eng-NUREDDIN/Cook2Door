const { body, validationResult } = require('express-validator');
const cookSchema = require('../models/cookSchema');

const validCustomer = [
  body('first_name')
    .notEmpty()
    .withMessage('First Name Is Required.')
    .trim()
    .isString()
    .withMessage('First Name Must Be String.')
    .isLength({ min: 2, max: 50 })
    .withMessage(
      'First Name Must Be More Than Or Equal 2 Characters And Less Than Or Equal 50 Charecters.'
    )
    .isAlpha()
    .withMessage('First Name Must be a-z or A-Z.'),
  body('last_name')
    .notEmpty()
    .withMessage('Last Name Is Required.')
    .trim()
    .isString()
    .withMessage('Last Name Must Be String.')
    .isLength({ min: 2, max: 50 })
    .withMessage(
      'Last Name Must Be More Than Or Equal 2 Characters And Less Than Or Equal 50 Charecters.'
    )
    .isAlpha()
    .withMessage('Last Name Must be a-z or A-Z.'),
  body('password')
    .notEmpty()
    .withMessage('Password Is Required.')
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be at least 8 and at most 64 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,}$/)
    .withMessage(
      'Password should contain a combination of uppercase letters, lowercase letters, numbers, and special characters.'
    ),
  body('email')
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .custom(async (value) => {
      const customer = await patientModel.findOne(value);
      if (customer) {
        throw new Error('Email address is already registered.');
      }
      return true;
    }),
  body('gender')
    .isIn([
      'male',
      'female',
      'nonbinary',
      'agender',
      'genderqueer',
      'genderfluid',
      'other',
      'prefer_not_to_say',
    ])
    .withMessage('Invalid gender value'),
  body('birthdate')
    .notEmpty()
    .withMessage('Birthdate is required')
    .isDate()
    .withMessage('Invalid birthdate format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// const validCook = []

const validOrder = [];

module.exports = { validCustomer, validCook, validOrder };
