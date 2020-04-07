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

LevelWord.randomByRange = function (min,max,result) {
  sql.query(`
    SELECT id,word FROM level_words
    WHERE zipf_value BETWEEN ? and ?
    ORDER BY RAND()
    LIMIT 10
    `, [min,max],
    function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

LevelWord.anagrams = function (word, result) {
  sql.query(`SELECT * FROM levelword_anagrams WHERE level_word = ? `, word, 
  function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

LevelWord.all = function (result) {
  sql.query(`SELECT * FROM level_words`,
    function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
      buildAnagrams(res)
    }
  });
};

function buildAnagrams(data){
  data = JSON.parse(JSON.stringify(data))

  let getPermutations =  function(leafs) {
    var branches = [];
    if (leafs.length == 1) return leafs;
    for (var k in leafs) {
      var leaf = leafs[k];
      getPermutations(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
        branches.push([leaf].concat(subtree));
      });
    }
    return branches;
  };

  let word;
  let permutations = data.map((obj) => {
    word = obj.word
    return getPermutations(word.split('')).map(function(str) { return str.join('') }).filter(item => { return item.length >= 3 })
  });

  // Write to JSON file::
  /////////////////////////////////////////////////////////////////////////////

  let output = {}
  permutations.forEach( set => {
    console.log(set[0])
    set.forEach(word => {
      output[word] = set[0]
    });
  })
  try {
    fs.writeFileSync('./api/word-permutations-hash.json', JSON.stringify(output))
  } catch(err) {
    console.error(err);
  }

}


module.exports= LevelWord;