import { Schema, model } from 'mongoose'

const AuthorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
}, { timestamps: true })

AuthorSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

export default model('Author', AuthorSchema)
