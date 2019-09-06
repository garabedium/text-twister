"use strict";

// Store data
var model = {
	"currentWord":{"word":"","letters":[],"removed":[],"charCodes":[],"charCodesRemoved":[]},
	"solvedWords":[],
	"user":{"score":0, "level":1, "solved":false},
	"api":{
		"getWords": {
			"apiType":"words.json/randomWords?hasDictionaryDef=true&",
			"params": {
				"minCorpusCount":9999,
				"minDictionaryCount":5,
				"minLength":6,
				"maxLength":6,
				"limit":25
			}
		},
		"checkWord": {
			"apiType":"word.json/",
			"params":{
				"definitions?limit":1,
				"includeRelated":"true",
				"sourceDictionaries":"all",
				"useCanonical":"false",
				"includeTags":"false"
			}
		}
	}
};
var control = {
	// Initiate Views & Get Data via API
	init: function(){
		// this.getData();
		this.getWord();
		this.guessWord();
		this.buttonControls();
	},
	getWord: function(){
		// Gets the word from the api:
		var regex = '^[a-z]+$';
		var xhr = new XMLHttpRequest();
		var url = 'https://wordsapiv1.p.rapidapi.com/words/?letters=6&';
		url += 'letterPattern=' + encodeURIComponent(regex) + '&'
		url += 'random=true'

		xhr.open('GET', url);
		xhr.setRequestHeader('x-rapidapi-host','wordsapiv1.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key','7e7cb7d528msh2de4a1e884f778fp1665b5jsn291e57fa21a4');
		xhr.onload = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				var data = JSON.parse(xhr.responseText);
				control.parseWord(data);
			} else {
				console.log('Request failed. Returned status of ' + xhr.status);
			}
		}
		xhr.send();
	},
	parseWord: function(data){
		if (data.word){
			model.currentWord.word = data.word;
			model.currentWord.letters = model.currentWord.word.split('');
			var letters = model.currentWord.letters;
			model.currentWord.charCodes = letters.map(function(letter){
				return letter.charCodeAt();
			})

			control.scramble(model.currentWord.word);
	
			// Start View
			userView.init();
		}
	},
	validateWord: function(word){

		// Check if this is a valid word:
		var xhr = new XMLHttpRequest();
		var url = 'https://wordsapiv1.p.rapidapi.com/words/' + word;

		xhr.open('GET', url);
		xhr.setRequestHeader('x-rapidapi-host','wordsapiv1.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key','7e7cb7d528msh2de4a1e884f778fp1665b5jsn291e57fa21a4');
		xhr.onload = function() {
			if (xhr.readyState == 4 && xhr.status == 200){

				var data = JSON.parse(xhr.responseText);
				console.log(data.word)

				// Words API may return a partial / fuzzy match that was not the user's guess
				// Check if returned word matches user's guess
				if (data.word !== word) {
					return userView.renderFeedback('invalid');
				}

				// Clear guess input
				document.getElementById('guess-input').value = '';

				// Update model with latest solved:
				model.solvedWords.push(data.word);
				control.processSolvedWord();

			} else {
				userView.renderFeedback('invalid');
			}
		}
		xhr.send();
	},
	processSolvedWord: function() {
		var lastSolved = model.solvedWords[model.solvedWords.length - 1];

		// Return solved letters to model.letters, remove from model.removed
		control.recycleRemoved();

		// Update view with solved word:
		userView.renderSolved(lastSolved);

		// Display feedback
		if (lastSolved.length == 6){
			control.levelUp(true);
			userView.renderFeedback('levelup');
		} else {
			userView.renderFeedback('solved');
		}

		// Award points
		control.incrementScore(lastSolved);
	},
	displayWord: function(input){
		var wordHeader = document.getElementById('word-header');
		wordHeader.innerHTML=input;
	},
	scramble: function(word){

		// Convert word to array
		var word = word.split('');

	    var counter = word.length;

	    // While there are elements in the word
	    while (counter > 0) {
	        // Pick a random index
	        var index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        var temp = word[counter];
	        word[counter] = word[index];
	        word[index] = temp;
			}

			word = word.join('');

	    // Make sure scrambled word isn't solved word
	    if ( word != model.currentWord.word ){
	    	return control.displayWord(word);
	    } else {
	    	return this.scramble();
			}

	},
	guessWord: function(){
		var guessForm = document.getElementById('guess-form'),
			guessInput = document.getElementById('guess-input'),
			guessDisplay = document.getElementById('guess-display');

		// Only accept letters in the word, and Enter key
		guessInput.onkeypress = function(e){

			var char = e.keyCode,
				word = model.currentWord.word,
				keycodes = model.currentWord.charCodes,
				keycodesRemoved = model.currentWord.charCodesRemoved;
				//letters = model.currentWord.letters,
				//lettersRemoved = model.currentWord.removed;

			// If character pressed isn't part of the word, do nothing
			// Else, remove that character from the letters array and add it to removed array
			if (keycodes.indexOf(char) === -1 && char !== 13){
				e.preventDefault();
			} else if (char !== 13){
				var index = keycodes.indexOf(char);
				keycodes.splice(index,1);
				keycodesRemoved.push(char);
			}
		};

		// If the last index of the guessInput value array exists in model.removed
		// Then, remove it from model.charCodesRemoved
		// Add it back to model.charCodes
		guessInput.onkeydown = function(e){
			var char = e.keyCode;
		// On backspace get input value
			if (char === 8){
				var array = guessInput.value,
					lastInputChar = array.slice(-1);

				lastInputChar = lastInputChar.charCodeAt();

				if(model.currentWord.charCodesRemoved.indexOf(lastInputChar) >= 0){
					var index = array.indexOf(lastInputChar);
					model.currentWord.charCodesRemoved.splice(index,1);
					model.currentWord.charCodes.push(lastInputChar);
				}
			}
		};

		// If the input field is blank (ctrl + a + backspace)
		// Recycle letters: run recycleRemoved
		guessInput.onkeyup = function(e){
			var char = e.keyCode;
			if (char === 8){
				var inputArray = guessInput.value;
				if (inputArray === ''){
					control.recycleRemoved();
				}
			}
		}

		// Check if string has already been solved
		// If it hasn't, make sure it's a word
		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			var guessValue = guessInput.value;
			if (model.solvedWords.indexOf(guessValue) === -1){
				// control.getData(guessValue);
				control.validateWord(guessValue);
			} else {
				userView.renderFeedback('duplicate');
			}
		});
	},
	recycleRemoved: function(){
		// If there's a valid word
		// Return the removed characters to letters array and reset currentWord.removed
		model.currentWord.charCodesRemoved.forEach(function(item){
			model.currentWord.charCodes.push(item);
		});
			model.currentWord.charCodesRemoved = [];
	},
	buttonControls: function(){
		// Scramble word with spacebar
		document.body.onkeyup = function(e){
		    if(e.keyCode === 32){
		    	control.scramble(model.currentWord.word);
		    } else {
		    	return false;
		    }
		};
	},
	incrementScore: function(input){

		// Award points based on word length
		var wordLength = input.length,
		scoreMultiplier = [10,15,20,50];

		switch (wordLength) {
		  case 3: model.user.score += wordLength * scoreMultiplier[0]
		  break;

		  case 4: model.user.score += wordLength * scoreMultiplier[1]
		  break;

		  case 5: model.user.score += wordLength * scoreMultiplier[2]
		  break;

		  case 6: model.user.score += wordLength * scoreMultiplier[3]
		  break;
		}

		// Display score to user
		userView.renderScore();
	},
	levelUp: function(input){
		model.user.solved = input;
		//return model.user.solved;
	},
	incrementLevel: function(){
		model.user.level += 1;
		userView.renderLevel();
	},
	resetScoreLevel: function(){
		model.user.score = 0;
		model.user.level = 1;
		userView.renderScore();
		userView.renderLevel();
	},
	resetSolvedWords: function(){
		model.solvedWords = [];
	},
	resetButton: function(){
		var resetNext = document.getElementById('reset-next'),
			btnContinue = 'Next Level <i class="material-icons">trending_up</i>',
			btnReset = 'Play Again <i class="material-icons">replay</i>';

		// If user solved a six letter word, levelup or reset game
		if (model.user.solved === true){
			// Update reset button & move to next level
			resetNext.innerHTML = btnContinue;
			control.incrementLevel();
		} else {
			// Update reset button & reset score/level
			resetNext.innerHTML = btnReset;
			control.resetScoreLevel();
		}

		resetNext.className= '';
		resetNext.addEventListener('click', control.resetContinue);
	},
	resetContinue: function(){

		// Empty solved words array
		control.resetSolvedWords();

		// Select a new word
		control.getWord();

		// Reset user level status
		control.levelUp(false);

		userView.renderReset('show');

	},

};
var userView = {
	init: function(){
		this.renderModal();
		this.renderScramble();
		this.renderScore();
		this.renderLevel();
	},
	renderInputFocus(){
		var guessInput = document.getElementById('guess-input');
		guessInput.focus();
	},
	renderModal: function(){
		var startGame = document.getElementById('start'),
			modal = document.getElementById('modal');

		function hideModal(){
			modal.className="hide-modal";
			userView.renderInputFocus();
			userView.renderTimer();
		}

		startGame.addEventListener('click', hideModal);
	},
	// Display scrambled word
	renderScramble: function(){
		var wordScramble = document.getElementById('scramble');
		wordScramble.addEventListener('click', function(){ control.scramble(model.currentWord.word) } );
	},
	// Display solved words
	renderSolved: function(input){

		var solvedList = document.getElementById('solved-words'),
			wordItem = document.createElement('li');

			wordItem.innerHTML = input;

		solvedList.appendChild(wordItem);
	},
	renderFeedback: function(input){

		var messageType = input,
			feedbackMessage = document.getElementById('feedback-message'),
			feedbackIcon = document.getElementById('feedback-icon');

		switch (messageType) {
		  case "duplicate":
		  	feedbackMessage.innerHTML='You already solved that word.';
		  	feedbackIcon.innerHTML='error';
		  break;

		  case "invalid":
		  	feedbackMessage.innerHTML='Not in our dictionary.';
		  	feedbackIcon.innerHTML='error';
		  break;

		  case "solved":
		  	feedbackMessage.innerHTML='Points! Keep solving!';
		  	feedbackIcon.innerHTML='stars';
		  break;

		  case "levelup":
		  	feedbackMessage.innerHTML='Congrats! <br/> You solved the six letter word!';
		  	feedbackIcon.innerHTML='trending_up';
		  break;
		}

	},
	renderReset: function(input){

		var resetNext = document.getElementById('reset-next'),
			header = document.getElementById('word-header'),
			form = document.getElementById('guess-form'),
			guessInput = document.getElementById('guess-input'),
			word = model.currentWord.word,
			solvedWords = document.getElementById('solved-words'),
			feedbackMessage = document.getElementById('feedback-message'),
			feedbackIcon = document.getElementById('feedback-icon');

		if (input === 'hide'){

			// Show 6 letter word, hide form
			form.className = 'hide-visibility';
			header.className = 'solved';

			control.displayWord(word);

			// Reset solved words, guess input
			solvedWords.innerHTML = '';
			feedbackMessage.innerHTML = '';
			feedbackIcon.innerHTML = '';
			guessInput.value = '';

		} else {

			// Show form and reset header
			form.className = '';
			header.className = '';

			// Show form and reset header
			form.className = '';
			header.className = '';
			feedbackMessage.className = '';

			// Hide the reset-next button
			resetNext.className= 'hide';

			// Start the timer
			userView.renderTimer();
		}

		userView.renderInputFocus();
		//userView.renderTimer();

	},
	renderScore: function(){
		var score = document.getElementById('score');
		score.innerHTML=model.user.score;
	},
	renderLevel: function(){
		var level = document.getElementById('level');
			level.innerHTML = model.user.level;
	},
	renderTimer: function(){

		var display = document.getElementById('timer'),
			gameTime = 60,
			interval = 1000;

		function startTimer(duration,display){

		 	var	timer = duration;

			var countdown = setInterval(function(){

		      display.innerHTML=timer--;

		      if (timer === -1){

		        clearInterval(countdown);

		        // Hide header and form
				userView.renderReset('hide');

				// Add Reset or Next button
				control.resetButton();

		      }

			}, interval);

		};

		startTimer(gameTime,display);

	},
};

// Initialize Control
control.init();
