import { Router } from 'express'
import AuthorController from '../controllers/author.controller'
import AuthorRules from '../rules/author.rules'
import { validate } from '../middlewares/rules.middleware'

class AuthorRoutes {
  constructor () {
    this.router = Router()
  }

  get routes () {
    // Signup an Author
    this.router.post(
      '/signup',
      AuthorRules.getRule('forSignup'),
      validate,
      (req, res, next) => { AuthorController.signup(req, res, next) }
    )

    // Signin an Author
    this.router.post(
      '/signin',
      AuthorRules.getRule('forSignin'),
      validate,
      (req, res, next) => { AuthorController.signin(req, res, next) }
    )

    return this.router
  }
}

export default new AuthorRoutes()
