"use strict";
exports.__esModule = true;
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var express_1 = require("express");
var path_1 = require("path");
var config_1 = require("./src/config");
var level_word_router_1 = require("./src/server/models/level-words/level-word.router");
var anagram_router_1 = require("./src/server/models/anagrams/anagram.router");
/**
 * App Variables
 */
var app = (0, express_1["default"])();
var distDirPath = new URL('dist/', import.meta.url).pathname;
var appIndex = path_1["default"].join(distDirPath, 'index.html');
/**
 * App Config
 */
app.use((0, cors_1["default"])());
app.use((0, helmet_1["default"])());
// Parse requests as application/json:
app.use(express_1["default"].json());
// Serve static files directory:
app.use(express_1["default"].static(distDirPath));
/**
 * App Routes
 */
app.get('/', function (_request, response) {
    // sendFile transfers the file for a given path:
    response.sendFile(appIndex);
});
app.use('/api/level-words', level_word_router_1["default"]);
app.use('/api/anagrams', anagram_router_1["default"]);
/**
 * Activate Server
 */
app.listen(config_1["default"].port, function () {
    console.log("Listening on port: ".concat(config_1["default"].port));
});
