const { model, Schema } = require('mongoose')

const noteSchema = new Schema({
  content: {
    type: String,
    minLength: 2,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
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
