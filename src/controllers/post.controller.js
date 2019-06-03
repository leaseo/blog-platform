import PostRepository from '../repositories/post.repository'
import { HttpServerException } from '../classes/httpException.class'
import { Post } from '../models/post.model'

class PostController {
  async create (req, res, next) {
    try {
      // Creates Post
      const { title, content, isDraft, isPrivate } = req.body
      const authorId = req.authorId
      const post = new Post(title, content, isDraft, isPrivate, authorId)
      const result = await PostRepository.create(post)
      return res.status(201).json(result)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }

  async findAll (req, res, next) {
    // Retrieves all posts from the logged Author no matter
    // if they are draft/published or private/public.
    try {
      const authorId = req.authorId
      const result = await PostRepository.findByAuthorId(authorId)
      return res.status(200).json(result)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }

  // async findById (req, res, next) {
  //   try {
  //   // Retrieves a post from the logged Author no matter
  //   // if they are draft/published or private/public.
  //     const postId = req.params.id
  //     const authorId = req.authorId
  //     const result = await PostRepository.findByIdAndAuthorId(postId, authorId)
  //     return res.status(200).json(result)
  //   } catch (err) {
  //     const error = new HttpServerException(err.name, err.errmsg)
  //     return next(error)
  //   }
  // }

  async delete (req, res, next) {
    try {
      // Deletes a post from the logged Author
      const postId = req.params.id
      const authorId = req.authorId
      const result = await PostRepository.deleteByIdAndAuthorId(postId, authorId)
      return res.status(200).json(result)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }
}

export default new PostController()
