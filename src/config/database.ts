import mysql from 'mysql2';
import config from './index';

const {
  host, db, db_user, db_password,
} = config;

const database = mysql.createConnection({
  host,
  user: db_user,
  password: db_password,
  database: db,
});

// database.on('error', (err: Error) => {
//   console.log('error...', err);
// });

// database.on('connection', () => {
//   console.log('connected');
// });
// const database = async () => {
//   await mysql.createConnection({
//     host,
//     user: db_user,
//     password: db_password,
//     database: db,
//   });
//   console.log('Connection to DB established.');
//   // return connection;
// };

export default database;
