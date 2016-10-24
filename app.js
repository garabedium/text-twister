
// Store data
var model = {
	"dictionary":[],
	"currentWord":{"word":"", "letters":[], "removed":[]},
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
		this.getData();
		this.guessWord();
		this.buttonControls();
	},
	getData: function(input){

		// Shared values for api calls
		var apiBase = 'http://api.wordnik.com:80/v4/',
			apiKey = 'api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61',
			apiParams = '',
			apiCall = '';

		function apiRequest(){
			var params, apiType, word;
				params = apiType = word = '';

			if (input === '' || input === undefined){
				params = model.api.getWords.params,
				apiType = model.api.getWords.apiType;
			} else {
				params = model.api.checkWord.params,
				apiType = model.api.checkWord.apiType,
				word = input + "/";
			}

			for(var key in params) {
				if(params.hasOwnProperty(key)){
					apiParams += key + "=" + params[key] + "&";
				}
			}

			apiCall = apiBase + apiType + word + apiParams + apiKey;

			return apiCall;
		}

		var xhr = new XMLHttpRequest();
		xhr.open('GET', ''+ apiRequest() +'');

		xhr.onload = function() {

		    if (xhr.readyState == 4 && xhr.status == 200){

		        var data = JSON.parse(xhr.responseText);
		        	data = data.results;

		 		var data = JSON.parse(xhr.responseText);

		 		// If there's no getData() input argument, we're selecting words
		 		// Else, we're validating a word
		      	if (input === '' || input === undefined){
			      	// Get words:
			 		data.forEach(function(item){
			 			control.validateWords(item.word);
			 		});
			 		control.selectWord();
			 	} else {

			        if (data.length > 0) {

			        	// Return solved letters to model.letters, remove from model.removed
			        	control.recycleRemoved();

			        	//Show solved word to user and store in our model
			        	userView.renderSolved(input);
			        	model.solvedWords.push(input);

			        	// Display feedback
			        	if (input.length == 6){
			        		control.levelUp(true);
			        		control.removeLevelWord(input);
			        		userView.renderFeedback('levelup');
			        	} else {
			        		userView.renderFeedback('solved');
			        	}

			        	// Clear guess input
			        	document.getElementById('guess-input').value = '';

			        	// Award points
			        	control.incrementScore(input);

			        } else {
			        	userView.renderFeedback('invalid');
			        }

			 	}

		    }
		    else {
		        alert('Request failed. Returned status of ' + xhr.status);
		    }

		};
		xhr.send();

	},
	validateWords: function(input){

		// Check if word is lowercase and contains no special characters
		// If valid, push word to dictionary
		var checkCase = input.search(/^[a-z]+$/);

		// Only save words that meet length and case requirements
		if (checkCase >= 0){
			model.dictionary.push(input);
		}

	},
	selectWord: function(){
		// Select random word from dictionary array
		var randomWord = model.dictionary[Math.round( Math.random() * (model.dictionary.length-1))];

		// Pass random word to be scrambled
		// Save original word for future use
		model.currentWord.word = randomWord;
		model.currentWord.letters = model.currentWord.word.split('');

		control.scramble(randomWord);

		// Start View
		userView.init();
	},
	displayWord: function(input){
		var wordHeader = document.getElementById('word-header');
		wordHeader.innerHTML=input;
	},
	scramble: function(array){
		// Convert word to array
		array = array.split('');

	    var counter = array.length,
	    	word = '',
	    	wordOriginal = model.currentWord.word;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        var index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        var temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }
	    	word = array.join('');

	    // Make sure scrambled word isn't solved word
	    if ( word != wordOriginal ){
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

			var char = e.key;
			var word = model.currentWord.word;
			var letters = model.currentWord.letters;
			var lettersRemoved = model.currentWord.removed;

			// If character pressed isn't part of the word, do nothing
			// Else, remove that character from the letters array and add it to removed array
			if (letters.indexOf(char) === -1 && e.keyCode !== 13){
				e.preventDefault();
			} else if (e.keyCode !== 13){
				index = letters.indexOf(char);
				letters.splice(index,1);
				lettersRemoved.push(char);
			}
		};

		// If the last index of the guessInput value array exists in model.removed
		// Then, remove it from model.removed
		// Add it back to model.letters

		guessInput.onkeydown = function(e){
			// On backspace get input value
			if (e.keyCode === 8){
				array = guessInput.value;
				lastInputChar = array.slice(-1);

				if(model.currentWord.removed.indexOf(lastInputChar) >= 0){
					index = array.indexOf(lastInputChar);
					model.currentWord.removed.splice(index,1);
					model.currentWord.letters.push(lastInputChar);
				}
			}
		}

		// If the input field is blank (ctrl + a + backspace)
		// Recycle letters: run recycleRemoved
		guessInput.onkeyup = function(e){
			if (e.keyCode === 8){
				inputArray = guessInput.value;
				if (inputArray === ''){
					//console.log("blank now");
					control.recycleRemoved();
				}
			}
		}

		// Check if string has already been solved
		// If it hasn't, make sure it's a word
		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			guessValue = guessInput.value;
			if (model.solvedWords.indexOf(guessValue) === -1){
				control.getData(guessValue);
			} else {
				userView.renderFeedback('duplicate');
			}
		});
	},
	recycleRemoved: function(){
		// If there's a valid word
		// Return the removed characters to letters array and reset currentWord.removed
		model.currentWord.removed.forEach(function(item){
			model.currentWord.letters.push(item);
		});
			model.currentWord.removed = [];
	},
	buttonControls: function(){
		// Scramble word with [spacebar]

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
	removeLevelWord: function(input){
		var word = input;
		//console.log(word);
		if (model.dictionary.indexOf(word) >= 0){
			wordIndex = model.dictionary.indexOf(word);
			model.dictionary.splice(wordIndex, 1);
		}
	},
	resetButton: function(){
		var resetNext = document.getElementById('reset-next'),
			btnContinue = 'Next Level <i class="material-icons">trending_up</i>',
			btnReset = 'Play Again <i class="material-icons">replay</i>';

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
		control.selectWord();

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
		//this.renderTimer();
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

		//control.sortSolved();

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

			control.removeLevelWord(word);
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

		startTimer(60,display);

	},
};

// Initialize Control
control.init();
