const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()
import TestHelper from '../classes/TestHelper.class'

chai.use(chaiHttp)
chai.use(require('chai-things'));

const contentType = TestHelper.get('contentType')
const apiKey = TestHelper.get('apiKey')
const apiVersion = TestHelper.get('apiVersion')
const endpoint = 'post'
let jwtToken = ''
let postCreated = ''

describe('===  Post  ===', () => {

  describe(`POST /${apiVersion}/${endpoint}`, () => {

    it('it should create a draft and public Post successfully, returning code 201', (done) => {
      jwtToken = TestHelper.get('jwtToken')

      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": false
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')

          postCreated = TestHelper.getBodyId(res.body)
          done()
        })
    })

    it('it should create a draft and private Post successfully, returning code 201', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": true
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')

          done()
        })
    })

    it('it should create a published and public Post successfully, returning code 201', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": false,
        "isPrivate": false
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')

          done()
        })
    })

    it('it should create a published and private Post successfully, returning code 201', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": false,
        "isPrivate": true
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')

          done()
        })
    })

    it('it should NOT create a Post due to lack of JWT Token, returning code 403', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": true
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        // .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.be.a('object')

          done()
        })
    })

    it('it should NOT create a Post due to lack of title, returning code 400', (done) => {
      const post = {
        // "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": true
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')

          done()
        })
    })

    it('it should NOT create a Post due to lack of content, returning code 400', (done) => {
      const post = {
        "title": "Post Title - Test",
        // "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": true
      }

      chai.request(server)
        .post(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')

          done()
        })
    })

    it('it should delete a Post successfully, returning code 200', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": false
      }

      const id = postCreated

      chai.request(server)
        .delete(`/${apiVersion}/${endpoint}/${id}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          done()
        })
    })

    it('it should NOT delete a Post due to invalid ID, returning code 400', (done) => {
      const post = {
        "title": "Post Title - Test",
        "content": "This is only a test content",
        "isDraft": true,
        "isPrivate": false
      }

      const id = 12345

      chai.request(server)
        .delete(`/${apiVersion}/${endpoint}/${id}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .send(post)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')

          done()
        })
    })

  })

  describe(`GET /${apiVersion}/post`, () => {
    it('it should retrieve all Posts (draft/published and public/private) from the logged user only', (done) => {
      chai.request(server)
        .get(`/${apiVersion}/${endpoint}`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .set('authorization', jwtToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          // res.body.should.all.include.something.that.deep.nested.property('author', {_id: })

          done()
        })
    })
  })

  // describe(`GET /${apiVersion}/post/:id`, () => {
  //   it('it should retrieve a Post (draft/published and public/private) from the logged user only', (done) => { })
  // })

})
