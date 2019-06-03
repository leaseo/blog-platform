const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()
import TestHelper from '../classes/TestHelper.class'

chai.use(chaiHttp)
chai.use(require('chai-things'))

const contentType = TestHelper.get('contentType')
const apiKey = TestHelper.get('apiKey')
const apiVersion = TestHelper.get('apiVersion')
const endpoint = 'blog'
let jwtToken = ''
let postCreated = ''

describe('===  Blog  ===', () => {
  describe(`GET /${apiVersion}/blog`, () => {
    it('it should retrieve all published and private Posts from the logged author and all public Post from any other author with empty search text, returning 200', (done) => {
      jwtToken = TestHelper.get('jwtToken')

      chai.request(server)
        .get(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.all.include.something.that.deep.nested.property('author')

          // INCOMPLETE

          done()
        })
    })

    it('it should retrieve all published and private Posts from the logged author and all public Post from any other author filtered by a search text, returning 200', (done) => {
      jwtToken = TestHelper.get('jwtToken')

      chai.request(server)
        .get(`/${apiVersion}/${endpoint}`)
        .query({ search: 'Title' })
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.all.include.something.that.deep.nested.property('author')

          // INCOMPLETE

          done()
        })
    })
  })
})
