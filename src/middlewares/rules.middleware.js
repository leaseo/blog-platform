import { validationResult } from 'express-validator/check'
import { HttpClientException } from '../classes/httpException.class'

export function validate (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpClientException('Validation Error', errors.array()))
  }

  next()
}
