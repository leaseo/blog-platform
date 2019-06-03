import AuthorRepository from '../repositories/author.repository'
import { HttpClientException, HttpServerException } from '../classes/httpException.class'
import { generatePasswordHash, comparePasswordHash, signJwtPayload } from '../classes/utils.class'
import { Author } from '../models/author.model'

class AuthorController {
  async signup (req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body
      const passwordHash = await generatePasswordHash(password)
      const author = new Author(firstName, lastName, email, passwordHash)
      const result = await AuthorRepository.create(author)
      return res.status(201).json(result)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }

  async signin (req, res, next) {
    try {
      const { email, password } = req.body
      const author = await AuthorRepository.findByEmail(email)

      // Validates Email
      if (!author) {
        const error = new HttpClientException('Signin Failed', 'Email and/or Password incorrect')
        return next(error)
      }

      // Validates Password
      const isSamePassword = await comparePasswordHash(password, author.password)
      if (!isSamePassword) {
        const error = new HttpClientException('Signin Failed', 'Email and/or Password incorrect')
        return next(error)
      }

      // Sign JWT
      const payload = {
        author: author,
        token: await signJwtPayload({ authorId: author['_id'] })
      }

      return res.status(200).json(payload)
    } catch (err) {
      const error = new HttpServerException(err.name, err.errmsg)
      return next(error)
    }
  }
}

export default new AuthorController()
