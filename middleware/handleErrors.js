module.exports = (error, _req, res, _next) => {
  console.log('error', error)
  res.status(500).json({ error: error.name }).end()
}
