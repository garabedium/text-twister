'use strict';

const mysql = require('mysql'),
      { host, db, db_user, db_password } = require('../../src/config/config');

const mc = mysql.createConnection({
  host: host,
  user: db_user,
  password: db_password,
  database: db
})

mc.connect(function(err){
  if (err) throw err
})

module.exports = mc;