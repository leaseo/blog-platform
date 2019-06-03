import { config } from 'dotenv'

class TestHelper {
  constructor() {
    if (!TestHelper.instance) {
      this._data = []

      config()

      this._data.push({ id: 'contentType', value: process.env.API_FORMAT })
      this._data.push({ id: 'apiKey', value: process.env.API_KEY })
      this._data.push({ id: 'apiVersion', value: process.env.API_VERSION })

      TestHelper.instance = this
    }

    return TestHelper.instance
  }

  add (id, value) {
    this._data.push({
      id: id,
      value: value
    })
  }

  set (id, value) {
    let result = this._data.find(d => d.id === id)
    result.value = value
  }

  get (id) {
    return this._data.find(d => d.id === id).value
  }

  // Helper Functions
  randomChars (length) {
    // returns a random number of characters
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  setAuthorCreated (author, password) {
    let authorCreated = {}

    Object
      .keys(author)
      .map(prop => authorCreated[prop] = author[prop])

    authorCreated.password = password

    return authorCreated
  }

  getBodyId (body) {
    return body['_id']
  }

}

const instance = new TestHelper()

Object.freeze(instance)

export default instance