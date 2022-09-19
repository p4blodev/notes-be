const info = (...params) => {
  console.info('ℹ️', ...params)
}

const error = (...params) => {
  console.error('🛑', ...params)
}

module.exports = {
  info,
  error,
}
