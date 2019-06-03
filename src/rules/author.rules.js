import { body } from 'express-validator/check'

class AuthorRules {
  constructor () {
    this.actions = {
      'forSignup': [
        body('firstName')
          .exists().withMessage('First Name cannot be missing')
          .not().isEmpty().withMessage('First Name cannot be empty')
          .isString().withMessage('First Name cannot contain special characters'),
        body('lastName')
          .exists().withMessage('Last Name cannot be missing')
          .not().isEmpty().withMessage('Last Name cannot be empty')
          .isString().withMessage('Last Name cannot contain special characters'),
        body('email')
          .exists().withMessage('Email cannot be missing')
          .not().isEmpty().withMessage('Email cannot be empty')
          .isEmail().withMessage('Email is not valid')
          .normalizeEmail(),
        body('password')
          .exists().withMessage('Password cannot be missing')
          .not().isEmpty().withMessage('Password cannot be empty')
          .isAlphanumeric().withMessage('Password should contain letters and numbers only')
          .isLength({ min: 7 }).withMessage('Password must be 7 charactes long at least')
      ],
      'forSignin': [
        body('email')
          .exists().withMessage('Email cannot be missing')
          .not().isEmpty().withMessage('Email cannot be empty')
          .isEmail().withMessage('Email is not valid')
          .normalizeEmail(),
        body('password')
          .exists().withMessage('Password cannot be missing')
          .not().isEmpty().withMessage('Password cannot be empty')
          .isAlphanumeric().withMessage('Password should contain letters and numbers only')
          .isLength({ min: 7 }).withMessage('Password must be 7 charactes long at least')
      ]
    }
  }

  getRule (action) {
    return this.actions[action]
  }
}

export default new AuthorRules()
