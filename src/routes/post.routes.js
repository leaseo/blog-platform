import { Router } from 'express'
import PostController from '../controllers/post.controller'
import PostRules from '../rules/post.rules'
import { validate } from '../middlewares/rules.middleware'

class PostRoutes {
  constructor () {
    this.router = Router()
  }

  get routes () {
    // Create a Post
    this.router.post(
      '/',
      PostRules.getRule('forCreate'),
      validate,
      (req, res, next) => { PostController.create(req, res, next) }
    )

    // List All Posts
    this.router.get(
      '/',
      PostRules.getRule('forFindAll'),
      validate,
      (req, res, next) => { PostController.findAll(req, res, next) }
    )

    // List a Post by ID
    this.router.get(
      '/:id',
      PostRules.getRule('forFind'),
      validate,
      (req, res, next) => { PostController.findById(req, res, next) }
    )

    // Delete a Post by ID
    this.router.delete(
      '/:id',
      PostRules.getRule('forDelete'),
      validate,
      (req, res, next) => { PostController.delete(req, res, next) }
    )

    return this.router
  }
}

export default new PostRoutes()
