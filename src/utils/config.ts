import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  CONNECTION_STRING: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
