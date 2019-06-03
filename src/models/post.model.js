export class Post {
  constructor (title, content, isDraft, isPrivate, author, id) {
    this.id = id
    this.title = title
    this.content = content
    this.isDraft = isDraft ? true : false
    this.isPrivate = isPrivate ? true : false
    this.author = author
  }
}
