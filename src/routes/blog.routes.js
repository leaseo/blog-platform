import { Router } from 'express'
import BlogController from '../controllers/blog.controller'

class BlogRoutes {
  constructor () {
    this.router = Router()
  }

  get routes () {
    // List the Blog
    this.router.get(
      '/',
      (req, res, next) => { BlogController.findAll(req, res, next) }
    )
    return this.router
  }
}

export default new BlogRoutes()
