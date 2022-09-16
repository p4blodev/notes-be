const { model, Schema } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id
    delete returnedDocument._id
    delete returnedDocument.__v
  },
})

const Note = model('Note', noteSchema)

module.exports = Note
