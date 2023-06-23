'use strict';
const Word = require('../models/word');
const LevelWord = require('../models/levelWord');
const zipfDefaultMin = 4.5;
const zipfDefaultMax = 6.5;

// Word APIs:
exports.getWord = function(req, res) {
  Word.getWordById(req.params.wordId, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
};

exports.validateWord = function(req, res) {
  Word.validate(req.params.word, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
}

// LevelWord APIs:
exports.validateLevelWord = function(req, res) {
  LevelWord.validate(req.params.word, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
}

exports.getRandomLevelWord = function(req, res) {
  LevelWord.random(function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
}

exports.getLevelWordsByRange = function(req, res) {
  const { 
    query: {
      zipf: { min, max },
      exclude,
    },
  } = req;

  let zipfMin = zipfDefaultMin;
  let zipfMax = zipfDefaultMax;

  if (parseFloat(min)){
    zipfMin = parseFloat(min);
  }

  if (parseFloat(max)){
    zipfMax = parseFloat(max);
  }

  let excludeWords = exclude || '';

  LevelWord.randomByRange(zipfMin, zipfMax, excludeWords, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
}

exports.getLevelWordAnagrams = function(req, res){
  LevelWord.anagrams(req.params.word, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
}
