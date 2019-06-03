import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isDraft: {
    type: Boolean,
    required: true
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
}, { timestamps: true })

PostSchema.index({
  title: "text",
  content: "text"
})

export default model('Post', PostSchema)
