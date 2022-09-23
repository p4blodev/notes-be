import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user';
import { envConfig } from '../utils';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  console.log('🚀 ~ file: login.js ~ line 10 ~ loginRouter.post ~ user', user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, envConfig.SECRET!);

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
