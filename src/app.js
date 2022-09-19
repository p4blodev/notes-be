const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRoute = require('./controllers/users')
const middleware = require('./utils/middleware')
require('./db')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRoute)
app.get('/', (_req, res) => {
  res.send('<h1>Welcome to api notes.</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
