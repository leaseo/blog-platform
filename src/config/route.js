import { Router } from 'express'
import { HttpServerException, HttpForbiddenException } from '../classes/httpException.class'
// import { verifyJwtPayload } from '../classes/utils.class'
import AuthorRoutes from '../routes/author.routes'
import PostRoutes from '../routes/post.routes'
import BlogRoutes from '../routes/blog.routes'
import { verify } from 'jsonwebtoken'

export class Route {
  constructor(app) {
    this.app = app
    this.version = '/' + process.env.API_VERSION
    this.router = Router()
  }

  async verifyJwt (req, res, next) {
    try {
      const jwtToken = req.headers['authorization']

      // Check if token is sent
      if (jwtToken) {
        // Check if token is valid
        verify(jwtToken, process.env.JWT_SECRETKEY, (err, payload) => {
          if (err) {
            const error = new HttpForbiddenException(`JWT Token Invalid`, `Error - Token invalid`)
            next(error)
          }

          if (payload) {
            req.authorId = payload.authorId
            next()
          }
        })
      }
      else {
        const error = new HttpForbiddenException('JWT Token', 'Token is missing')
        next(error)
      }

    } catch (err) {
      const error = new HttpServerException(`JWT Token`, `There was an error validating the token`)
      next(error)
    }
  }

  async optionalJwt (req, res, next) {
    try {
      const jwtToken = req.headers['token']
      if (jwtToken) {
        verify(jwtToken, process.env.JWT_SECRETKEY, (err, payload) => {
          if (err) {
            //
          }

          if (payload) {
            req.authorId = payload.authorId
          }
        })
      }
      next()
    } catch (err) {
      const error = new HttpServerException(`JWT Token`, `There was an error validating the token`)
      next(error)
    }
  }

  routes () {
    this.router.use('/', AuthorRoutes.routes)
    this.router.use('/post', this.verifyJwt, PostRoutes.routes)
    this.router.use('/blog', this.optionalJwt, BlogRoutes.routes)
    this.app.use(this.version, this.router)
  }
}
