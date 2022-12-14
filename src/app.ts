import express, { Express } from 'express';
import cors from 'cors';
import { ROUTES, usersRouter, loginRouter, notesRouter } from './controllers';
import { unknownEndpoint, errorHandler } from './utils/middleware';
import { connectDB } from './db';

connectDB();
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(ROUTES.LOGIN, loginRouter);
app.use(ROUTES.NOTES, notesRouter);
app.use(ROUTES.USERS, usersRouter);
app.get('/', (_req, res) => {
  res.send('<h1>Api notes.</h1>');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
