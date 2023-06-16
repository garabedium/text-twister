import mysql from 'mysql2';
import config from './index';

const {
  host, db, db_user: user, db_password: password,
} = config;

const database = mysql.createConnection({
  host,
  user,
  password,
  database: db,
});

export default database;
