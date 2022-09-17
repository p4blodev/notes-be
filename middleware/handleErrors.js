module.exports = (error, _req, res, _next) => {
  console.log('🛑 handleError -> error', error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else {
    return res.status(400).json({ error: 'bad request' })
  }
}
