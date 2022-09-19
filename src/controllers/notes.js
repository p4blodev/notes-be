const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  Note.find({})
    .then((notes) => res.json(notes))
    .catch(() => res.status(500).json({ error: 'something went wrong' }))
})

notesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end()
    })
    .catch((error) => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

notesRouter.post('/', (req, res, next) => {
  const note = req.body

  if (!note) {
    return res.status(400).json({
      error: 'request body is invalid',
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date().toISOString(),
    important: note.important || false,
  })

  newNote
    .save()
    .then((savedNoted) => res.status(201).json(savedNoted))
    .catch((error) => {
      next(error)
    })
})

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing',
    })
  }

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => next(error))
})

module.exports = notesRouter
