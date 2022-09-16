const logger = (req, _res, next) => {
  console.log('Logger req.url: ', req.url)
  next()
}

module.exports = logger
