"use strict";
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var index_1 = require("./index");
var host = index_1["default"].host, db = index_1["default"].db, user = index_1["default"].db_user, password = index_1["default"].db_password;
var database = mysql2_1["default"].createConnection({
    host: host,
    user: user,
    password: password,
    database: db
});
exports["default"] = database;
