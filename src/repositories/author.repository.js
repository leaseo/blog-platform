import AuthorSchema from '../schemas/author.schema'
import { Repository } from '../config/repository'

class AuthorRepository extends Repository {
  constructor () {
    super(AuthorSchema)
  }

  async findByEmail (email) {
    return AuthorSchema.findOne({
      email: email
    })
  }
}

export default new AuthorRepository()
