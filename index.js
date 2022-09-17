require('dotenv').config()
require('./db')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const Note = require('./models/Note')

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (_req, res) => {
  res.send('<h1>Welcome to api notes.</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then((notes) => res.json(notes))
    .catch(() => res.status(500).json({ error: 'something went wrong' }))
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (req, res, next) => {
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

app.put('/api/notes/:id', (req, res, next) => {
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

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
