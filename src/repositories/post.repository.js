import PostSchema from '../schemas/post.schema'
import { Repository } from '../config/repository'

class PostRepository extends Repository {
  constructor() {
    super(PostSchema)
  }

  async findByAuthorId (authorId) {
    let query = {
      author: authorId
    }

    return PostSchema
      .find(query)
      .populate({
        path: 'author',
        select: 'firstName lastName email'
      })
      .sort({
        createdAt: 'desc'
      })
  }

  async findByIdAndAuthorId (postId, authorId) {
    return PostSchema.findOne({
      _id: postId,
      author: authorId
    }).populate({
      path: 'author',
      select: 'firstName lastName email'
    })
  }

  async deleteByIdAndAuthorId (postId, authorId) {
    return PostSchema.findOneAndDelete({
      _id: postId,
      author: authorId
    }).populate({
      path: 'author',
      select: 'firstName lastName email -_id'
    })
  }

  async findBlog (authorId, searchText) {
    let query = {
      isDraft: false,
      $or: [
        {
          author: authorId
        },
        {
          author: { $ne: authorId },
          isPrivate: false
        }
      ]
    }

    if (searchText) {
      query["$text"] = { $search: searchText }
    }

    return PostSchema
      .find(query)
      .sort({
        createdAt: 'desc'
      })
      .populate({
        path: 'author',
        select: 'firstName lastName email -_id'
      })
  }
}

export default new PostRepository()
