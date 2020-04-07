'use strict';

const mysql = require('mysql'),
      { host, db, db_user, db_pwd } = require('../config');

const mc = mysql.createConnection({
  host: host,
  user: db_user,
  password: db_pwd,
  database: db
})

mc.connect(function(err){
  if (err) throw err
})

module.exports = mc;