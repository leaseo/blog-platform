import { body, param } from 'express-validator/check'

class PostRules {
  constructor () {
    this.actions = {
      'forCreate': [
        body('title')
          .exists().withMessage('Title cannot be missing')
          .not().isEmpty().withMessage('Title cannot be empty')
          .isString().withMessage('Title cannot contain special characters'),
        body('content')
          .exists().withMessage('Content cannot be missing')
          .not().isEmpty().withMessage('Content cannot be empty')
          .isString().withMessage('Content cannot contain special characters'),
        body('isDraft')
          .optional()
          .isBoolean().withMessage('Draft cannot contain special characters'),
        body('isPrivate')
          .optional()
          .isBoolean().withMessage('Private cannot contain special characters')
        // body('author')
        //   .exists().withMessage('Author cannot be missing')
        //   .not().isEmpty().withMessage('Author cannot be empty')
        //   .isMongoId().withMessage('Author cannot contain special characters')
      ],
      'forFindAll': [
        param('id')
          .optional()
      ],
      'forFind': [
        param('id')
          .exists().withMessage('Post ID cannot be missing')
          .isMongoId().withMessage('Post ID is not valid')
      ],
      'forDelete': [
        param('id')
          .exists().withMessage('Post ID cannot be missing')
          .isMongoId().withMessage('Post ID is not valid')
      ]
    }
  }

  getRule (action) {
    return this.actions[action]
  }
}

export default new PostRules()
