import mongoose from 'mongoose';
import logger from './utils/logger';
import { envConfig } from './utils';

export const connectDB = async () => {
  await mongoose
    .connect(envConfig.CONNECTION_STRING!)
    .then(() => {
      logger.info('✅ Database connected');
    })
    .catch((error: { message: string }) => {
      logger.error('🟥 Database connection ~ error', error.message);
    });
};
