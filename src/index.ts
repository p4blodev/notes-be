import dotenv from 'dotenv';
import app from './app';
import http from 'http';
import logger from './utils/logger';
import { envConfig } from './utils';
dotenv.config();

const server = http.createServer(app);

server.listen(envConfig.PORT, () => {
  logger.info(`✅ Server running on port: ${envConfig.PORT}`);
});
