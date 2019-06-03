export class Repository {
  constructor (schemaModel) {
    this.model = schemaModel
  }

  // Write
  async create (item) {
    return this.model.create(item)
  }

  async update (id, item) {
    return this.model.findByIdAndUpdate(id, item, { new: true })
  }

  async delete (id) {
    return this.model.findByIdAndDelete(id)
  }

  // Read
  async find (cond, fields, options) {
    return this.model.find(cond, fields, options)
  }

  async findAll () {
    return this.model.find()
  }

  async findById (id) {
    return this.model.findById(id)
  }

  async findByCode (code) {
    return this.model.findOne({ code })
  }

  async findOne (cond) {
    return this.model.findOne(cond)
  }
}
