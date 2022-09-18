const mongoose = require('mongoose')
const logger = require('./utils/logger')

const connectionString = process.env.MONGODB_URI

mongoose
  .connect(connectionString)
  .then(() => {
    logger.info('✅ Database connected')
  })
  .catch((error) => {
    logger.error('🟥 Database connection ~ error', error.message)
  })
