const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const user = req.body

  const { username, name, password } = user

  if (!(username || name || password)) {
    return res.status(400).json({
      error: 'bad request',
    })
  }

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  await newUser
    .save()
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((error) => {
      next(error)
    })
})

module.exports = userRouter
