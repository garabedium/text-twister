
// Store data
var model = {
	dictionary:[],
	currentWord: {
		word:'',
		letters:[],
		removed:[],
	},
	solvedWords:[],
	user:{
		score: 0,
		level: 1,
	},
};
var control = {
	// Initiate Views & Get Data via API
	init: function(){
		this.getData();
		this.guessWord();
		this.buttonControls();
	},
	getData: function(){
		var xhr = new XMLHttpRequest();

		var apiBase = 'http://api.pearson.com/v2/dictionaries/ldoce5/entries?';
		var apiOffsetLimit = 33486;
		var apiRandomOffset = '&offset=' + Math.floor(Math.random() * (apiOffsetLimit - 0) + 0);
		var apiResultLimit = '&limit=' + 100;

		xhr.open('GET', ''+ apiBase + apiRandomOffset + apiResultLimit +'');
		xhr.onload = function() {
		    if (xhr.status === 200) {
		        var data = JSON.parse(xhr.responseText);
		        	data = data.results;

					data.forEach(function(item) {
						item = item.headword;

						control.validateWords(item);

					});
					control.selectWord();
		    }
		    else {
		        alert('Request failed. Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	},
	validateWords: function(input){
		// Make sure words meet the minmax length and character restrictions
		// If they meet the requirements, push to dictionary
		var checkMinMax = 6;
		var checkCase = input.search(/^[a-z]+$/);

		// Only save words that meet length and case requirements
		if (input.length === checkMinMax && checkCase >= 0){
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

		// Check if string has already been solved
		// If it hasn't, make sure it's a word
		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			guessValue = guessInput.value;
			if (model.solvedWords.indexOf(guessValue) === -1){
				control.checkWord(guessValue);
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
		// Clear input on shift
		document.body.onkeyup = function(e){
		    if(e.keyCode === 32){
		    	control.scramble(model.currentWord.word);
		    } else {
		    	return false;
		    }
		};

	},
	checkWord: function(input){
		var xhr = new XMLHttpRequest();
		var apiHeadWord = input;
		var apiBase = 'http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=';

		xhr.open('GET', ''+ apiBase + apiHeadWord +'');
		xhr.onload = function() {

		    if (xhr.status === 200) {
		    	var data = JSON.parse(xhr.responseText);
		        data = data.results;
		        if (data.length > 0) {

		        	// Return solved letters to model.letters, remove from model.removed
		        	control.recycleRemoved();

		        	//Show solved word to user and store in our model
		        	userView.renderSolved(apiHeadWord);
		        	model.solvedWords.push(apiHeadWord);

		        	// Display feedback
		        	userView.renderFeedback('solved');

		        	// Clear guess input
		        	document.getElementById('guess-input').value = '';

		        	// Award points
		        	control.addScore(apiHeadWord);

		        } else {
		        	userView.renderFeedback('invalid');
		        }
		    }
		    else {
		        alert('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	},
	addScore: function(input){

		// Points awarded based on word length
		wordLength = input.length;
		scoreMultiplier = [10,15,20,25];

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
};
var userView = {
	init: function(){
		this.renderScramble();
		this.renderScore();
		//this.renderTimer();
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
			feedbackMessage = document.getElementById('feedback-message');

		switch (messageType) {
		  case "duplicate": feedbackMessage.innerHTML='<i class="material-icons">error_outline</i> You already solved that word.';
		  break;

		  case "invalid": feedbackMessage.innerHTML='<i class="material-icons">error_outline</i> Not in our dictionary.';
		  break;

		  case "solved": feedbackMessage.innerHTML='<i class="material-icons">stars</i> Points! Keep solving!';
		  break;

		  case "levelup": feedbackMessage.innerHTML='<i class="material-icons">check_circle</i> Congrats! You solved the six letter word!';
		  break;
		}

	},
	renderScore: function(){
		var score = document.getElementById('score');
		score.innerHTML=model.user.score;
	},
	renderTimer: function(){

		function startTimer(duration,display){

		 	var	timer = duration;

			var countdown = setInterval(function(){

		      display.innerHTML=timer--;

		      if (timer === 0){
		      	display.innerHTML='Time is up';
		        clearInterval(countdown);
		      } else {

		      }
			}, 1000);

		};

		display = document.getElementById('timer');
		startTimer(90,display);

	},
};

// Initialize Control
control.init();

