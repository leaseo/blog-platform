import PostRepository from '../repositories/post.repository'
import { HttpServerException } from '../classes/httpException.class'

class BlogController {
  async findAll (req, res, next) {
    // Retrieves all published and private posts from the logged Author
    // plus the public ones from another Authors
    try {
      const authorId = req.authorId
      const searchText = req.query.search
      const result = await PostRepository.findBlog(authorId, searchText)
      return res.status(200).json(result)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }
}

export default new BlogController()
