'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller')

  // Word API Routes:
  ///////////////////////////////////////////////////  

  // Get word by id:
  app.route('/api/word/id/:wordId')
  .get(controller.getWord)

  // Validate word:
  app.route('/api/word/validate/:word')
  .get(controller.validateWord)

  // LevelWord API Routes:
  ///////////////////////////////////////////////////

  // Validate level word
  app.route('/api/levelWord/validate/:word')
  .get(controller.validateLevelWord)

  // Get a random LevelWord
  app.route('/api/levelWord/random')
  .get(controller.getRandomLevelWord)

  // Get random LevelWords based on zipf value:
  app.route('/api/levelWord/range/:min&:max')
  .get(controller.getLevelWordsByRange)

  // Gets LevelWords anagram:
  app.route('/api/levelWord/anagrams/:word')
  .get(controller.getLevelWordAnagrams)


}

