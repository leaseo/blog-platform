const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()
import TestHelper from '../classes/TestHelper.class'

chai.use(chaiHttp)

let authorCreated = {}

const contentType = TestHelper.get('contentType')
const apiKey = TestHelper.get('apiKey')
const apiVersion = TestHelper.get('apiVersion')

describe('===  Author  ===', () => {

  describe(`POST /${apiVersion}/signup`, () => {
    it('it should create an Author successfully, returning code 201', (done) => {
      const randomEmail = TestHelper.randomChars(10) + '@test.com'
      const randomPassword = TestHelper.randomChars(10)

      const author = {
        firstName: "Test FirstName",
        lastName: "Test LastName",
        email: randomEmail,
        password: randomPassword
      }

      chai.request(server)
        .post(`/${apiVersion}/signup`)
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(201)
          res.should.be.a('object')
          res.body.should.have.property('_id')

          authorCreated = TestHelper.setAuthorCreated(res.body, randomPassword)
          done()
        })
    })

    it('it should NOT create an Author due to lack of firstName, returning code 400', (done) => {
      const randomEmail = TestHelper.randomChars(10) + '@test.com'
      const randomPassword = TestHelper.randomChars(10)

      const author = {
        // firstName: "Test FirstName",
        lastName: "Test LastName",
        email: randomEmail,
        password: randomPassword
      }

      chai.request(server)
        .post('/' + apiVersion + '/signup')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT create an Author due to lack of lastName, returning code 400', (done) => {
      const randomEmail = TestHelper.randomChars(10) + '@test.com'
      const randomPassword = TestHelper.randomChars(10)

      const author = {
        firstName: "Test FirstName",
        // lastName: "Test LastName",
        email: randomEmail,
        password: randomPassword
      }

      chai.request(server)
        .post('/' + apiVersion + '/signup')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT create an Author due to lack of email, returning code 400', (done) => {
      const randomEmail = TestHelper.randomChars(10) + '@test.com'
      const randomPassword = TestHelper.randomChars(10)

      const author = {
        firstName: "Test FirstName",
        lastName: "Test LastName",
        // email: randomEmail,
        password: randomPassword
      }

      chai.request(server)
        .post('/' + apiVersion + '/signup')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT create an Author due to lack of password, returning code 400', (done) => {
      const randomEmail = TestHelper.randomChars(10) + '@test.com'
      const randomPassword = TestHelper.randomChars(10)

      const author = {
        firstName: "Test FirstName",
        lastName: "Test LastName",
        email: randomEmail,
        // password: randomPassword
      }

      chai.request(server)
        .post('/' + apiVersion + '/signup')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })
  })

  describe(`POST /${apiVersion}/signin`, () => {
    it('it should log in an Author successfully, returning code 200', (done) => {
      const author = {
        email: authorCreated.email,
        password: authorCreated.password
      }

      chai.request(server)
        .post('/' + apiVersion + '/signin')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a('object')
          res.body.should.have.property('token')

          TestHelper.add('jwtToken', res.body.token)
          done()
        })
    })

    it('it should NOT log in an Author due to lack of email, returning code 400', (done) => {
      const author = {
        // email: authorCreated.email,
        password: authorCreated.password
      }

      chai.request(server)
        .post('/' + apiVersion + '/signin')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT log in an Author due to lack of password, returning code 400', (done) => {
      const author = {
        email: authorCreated.email,
        // password: authorCreated.password
      }

      chai.request(server)
        .post('/' + apiVersion + '/signin')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT log in an Author due email not existing, returning code 400', (done) => {
      const author = {
        email: 'somenotexisting@mail.com',
        password: authorCreated.password
      }

      chai.request(server)
        .post('/' + apiVersion + '/signin')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

    it('it should NOT log in an Author due password invalid, returning code 400', (done) => {
      const author = {
        email: authorCreated.email,
        password: '12345678'
      }

      chai.request(server)
        .post('/' + apiVersion + '/signin')
        .set('Content-Type', contentType)
        .set('x-api-key', apiKey)
        .send(author)
        .end((err, res) => {
          res.should.have.status(400)
          res.should.be.a('object')

          done()
        })
    })

  })

})
