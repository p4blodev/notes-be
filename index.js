const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: '1',
    content: 'nota uno',
    date: '2022-08-07T14:15:01.098z',
    important: true,
  },
  {
    id: '2',
    content: 'nota dos',
    date: '2022-08-05T15:15:01.098z',
    important: true,
  },
  {
    id: '3',
    content: 'nota tres',
    date: '2022-08-02T14:10:01.098z',
    important: true,
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Welcome to api notes</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content || note.important) {
    return res.status(400).json({
      error: 'note.content is missing',
    })
  }

  const newNote = {
    id: uuidv4(),
    content: note.content,
    date: new Date().toISOString(),
    important: note.important,
  }

  notes = [...notes, newNote]
  res.status(201).json(newNote)
})

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = req.body

  if (!note || !note.content || !note.id) {
    return res.status(400).json({
      error: 'note.content is missing',
    })
  }

  const noteIndex = notes.findIndex((current) => current.id === id)

  notes[noteIndex].content = note.content
  notes[noteIndex].important = note.important

  res.status(200).json(notes[noteIndex])
})

app.use((req, res) => {
  res.status(404).json({
    error: 'not found',
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
