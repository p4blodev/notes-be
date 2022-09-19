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

const errors = {
  CastError: (res) => res.status(400).send({ error: 'malformatted id' }),
  ValidationError: (res, error) =>
    res.status(400).json({ error: error.message }),
  unhandleError: (res, error) =>
    res.status(503).json({ error: error || 'unexcpeted error' }),
}

const errorHandler = (error, _req, res, next) => {
  console.log('🛑 handleError -> error', error.message)

  const handler =
    errors[error.name](res, error) || errors.unhandleError(res, error)

  next(handler)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
