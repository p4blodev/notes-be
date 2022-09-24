import bcrypt from 'bcrypt';
import express from 'express';
import User, { UserType } from '../models/user';
import { authHandler } from '../utils/middleware';

const usersRouter = express.Router();

usersRouter.get('/', authHandler, (_req, res, next) => {
  User.find({})
    .populate('notes', { content: 1, date: 1 })
    .then((users: UserType[]) => res.json(users))
    .catch((error) => next(error));
});

usersRouter.post('/', async (req, res, next) => {
  const user: UserType = req.body;

  const { username, name, password } = user;

  if (!(username || name || password)) {
    return res.status(400).json({
      error: 'bad request',
    });
  }

  const saltRound = 10;
  const passwordHashed = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    username,
    name,
    password: passwordHashed,
  });

  await newUser
    .save()
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((error) => {
      next(error);
    });
});

export default usersRouter;
