"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var envFound = dotenv_1["default"].config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}
exports["default"] = {
    port: parseInt(process.env.PORT, 10),
    db: process.env.DB,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    env: process.env.NODE_ENV
};
