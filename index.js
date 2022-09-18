require('dotenv').config()
const app = require('./src/app')
const http = require('http')
const logger = require('./src/utils/logger')

const server = http.createServer(app)

const PORT = process.env.PORT

server.listen(PORT, () => {
  logger.info(`✅ Server running on port: ${PORT}`)
})
