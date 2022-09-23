import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import logger from './logger';
import { envConfig } from '../utils';

interface IJwtPayload {
  _id: string;
}

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  logger.info('--- 🎬🎬🎬 ---');
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('--- 🏁🏁🏁 ---');
  next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'resource not found' });
};

const errors: any = {
  CastError: (res: Response) =>
    res.status(400).send({ error: 'malformatted id' }),
  ValidationError: (res: Response, error: any) =>
    res.status(400).json({ error: error.message }),
  unhandleError: (res: Response, error: any) =>
    res.status(503).json({ error: error || 'unexcpeted error' }),
  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: 'Unauthorized' }),
};

export const errorHandler: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error('handleError -> error -> message: ', error.message);

  const handler =
    errors[error.name](res, error) || errors.unhandleError(res, error);

  next(handler);
};

const getTokenFrom = (req: Request) => {
  const authorization = req.get('Authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFrom(req);

  if (token === null) return res.status(401).json({ error: 'Unauthorized' });

  const { _id } = jwt.verify(token, envConfig.SECRET!) as IJwtPayload;

  if (_id) {
    next({ name: 'unauthorized' });
  }
  next();
};
