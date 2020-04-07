'use strict';

const sql = require('./db.js');

var Word = function(word){
  this.word = word.word;
};

Word.getWordById = function (wordId, result) {
  sql.query("SELECT word FROM dictionary WHERE id = ? ", wordId, function (err, res) {             
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Word.validate = function (word, result) {
  sql.query("SELECT id, word FROM dictionary WHERE word = ? ", word, function (err, res) {             
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports= Word;