'use strict';

const sql = require('./db.js');
const fs = require('fs');

var LevelWord = function(word){
  this.word = word.word;
  this.zipf = word.zipf_value;
};

LevelWord.validate = function (word, result) {
  sql.query("SELECT word, zipf_value FROM level_words WHERE word = ? ", word, 
  function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

LevelWord.random = function (result) {
  sql.query(`
    SELECT w.word, w.zipf_value
    FROM level_words AS w
    INNER JOIN
        (SELECT ROUND( RAND() * (SELECT MAX(id) FROM level_words)) AS id) AS x
    WHERE
        w.id >= x.id
    LIMIT 1
  `, function(err, res){
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

LevelWord.randomByRange = function (min,max,exclude,result) {

  let query = `SELECT id, word, zipf_value FROM level_words
  WHERE zipf_value BETWEEN ? and ?
  AND word not in (?)
  ORDER BY RAND()
  LIMIT 5`
  sql.query(query, [min,max,exclude],
    function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      res = res.map((obj) => ({ ...obj, used: false }))
      result(null, res);
    }
  });
};

LevelWord.anagrams = function (word, result) {
  sql.query(`SELECT * FROM levelword_anagrams WHERE level_word = ? ORDER BY char_length(anagram) DESC `, word, 
  function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      res = res.map((obj) => ({...obj, solved: false}))
      result(null, res);
    }
  });
};

module.exports= LevelWord;