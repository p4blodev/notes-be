module.exports = (req, _res, next) => {
  console.log('--- 🎬🎬🎬 ---')
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('--- 🏁🏁🏁 ---')
  next()
}
