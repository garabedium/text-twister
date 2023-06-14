import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT as string, 10),
  db: process.env.DB,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  env: process.env.NODE_ENV,
};
