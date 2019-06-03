import { connect } from 'mongoose'
import { format, URL } from 'url'
import { config } from 'dotenv'

export class Database {
  constructor () {
    config()
    this.name = process.env.DB_NAME
    this.user = process.env.DB_USER
    this.pass = process.env.DB_PASS
    this.uri = format({
      hostname: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 27017,
      protocol: 'mongodb',
      slashes: true
    })
  }

  connect () {
    // Mongoose Connect
    // require('mongoose').set('debug', true)
    require('mongoose').set('useCreateIndex', true);
    connect(this.uri, {
      dbName: this.name,
      pass: this.pass,
      useNewUrlParser: true,
      user: this.user
    }, (err) => {
      err
        ? console.error(err)
        : null
        // : console.log(`Mongo DB Server --- Up and running on port ${new URL(this.uri).port}`)
    })
  }
}
