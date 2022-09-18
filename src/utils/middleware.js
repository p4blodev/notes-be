const logger = require('./logger')

const requestLogger = (req, _res, next) => {
  logger.info('--- 🎬🎬🎬 ---')
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('--- 🏁🏁🏁 ---')
  next()
}

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'resource not found' })
}

const errorHandler = (error, _req, res, next) => {
  console.log('🛑 handleError -> error', error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
