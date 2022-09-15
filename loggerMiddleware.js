const logger = (req, res, next) => {
  console.log("Logger req.url: ", req.url)
  next()
}

module.exports = logger
