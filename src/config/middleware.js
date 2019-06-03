import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import expressValidator from 'express-validator'
import { consoleLogger } from '../middlewares/logger.middleware'
import { apiValidator } from '../middlewares/header.middleware'

export class Middleware {
  constructor (app) {
    this.app = app
  }

  setup () {
    // Armoring the API with Helmet
    this.app.use(helmet())
    // Parse application/json
    this.app.use(json())
    // Express Validation Middleware
    this.app.use(expressValidator())
    // To use querystring library
    this.app.use(urlencoded({ extended: false }))
    // Print on console each inbound request
    // this.app.use(consoleLogger)
    // Validates API Key
    this.app.use(apiValidator)
    // Validates JWT
    // this.app.use(jwtValidator);
  }
}
