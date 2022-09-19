const jwt = require('jsonwebtoken')
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
  JsonWebTokenError: (res) => res.status(401).json({ error: 'Unauthorized' }),
}

const errorHandler = (error, _req, res, next) => {
  console.log('🛑 handleError -> error -> message: ', error.message)
  console.log('🛑 handleError -> error -> name: ', error.name)

  const handler =
    errors[error.name](res, error) || errors.unhandleError(res, error)

  next(handler)
}

const getTokenFrom = (req) => {
  const authorization = req.get('Authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

const authHandler = (req, res, next) => {
  const token = getTokenFrom(req)

  if (token === null) return res.status(401).json({ error: 'Unauthorized' })

  const decodeToken = jwt.verify(token, process.env.SECRET)

  if (!decodeToken.id) {
    next({ name: 'unauthorized' })
  }
}

module.exports = {
  authHandler,
  errorHandler,
  requestLogger,
  unknownEndpoint,
}
