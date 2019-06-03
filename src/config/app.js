import express from 'express'
import { config } from 'dotenv'
import { Database } from './database'
import { Middleware } from './middleware'
import { Route } from './route'
import { errorMiddleware } from '../middlewares/error.middleware'

export class App {
  constructor () {
    config()
    this.app = express()
    this.port = Number(process.env.NODE_PORT || 3000)

    this.initDatabase()
    this.initMiddleware()
    this.initRoute()
    this.initErrorHandling()
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Express  Server --- Up and running on port ${this.port}`)
    })
  }

  initDatabase () {
    const db = new Database()
    db.connect()
  }

  initMiddleware () {
    const mw = new Middleware(this.app)
    mw.setup()
  }

  initRoute () {
    const rt = new Route(this.app)
    rt.routes()
  }

  initErrorHandling () {
    this.app.use(errorMiddleware)
  }
}
