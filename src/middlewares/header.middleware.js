import { HttpUnauthorizedException } from '../classes/httpException.class'

export function apiValidator (req, res, next) {
  if (!req.headers['x-api-key'] || req.headers['x-api-key'] !== process.env.API_KEY) {

    console.log(req.headers)
    console.log('x-api-key', req.headers['x-api-key'])

    const error = new HttpUnauthorizedException(`API Key Invalid`, `API Key provided is not a valid one.`)
    return next(error)
  }
  next()
}
