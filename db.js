const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connected')
  })
  .catch((error) => {
    console.log('Database connection ~ error', error.message)
  })
