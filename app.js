
// Store data
var model = {
	dictionary:[],
	history:[],
	solvedWords:[],
};
var control = {
	// Initiate Views & Get Data (API Call)
	init: function(){
		userView.init();
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
		model.history.push(randomWord);
		control.scramble(randomWord);
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
	    	wordOriginal = model.history[0];

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

		// Only accept letters in the word and Enter
		guessInput.onkeypress = function(e){
			var char = e.key;
			var word = model.history[0];

			if ( word.indexOf(char) === -1 && e.keyCode !== 13){
				e.preventDefault();
			}
		};

		// Check if string has already been solved
		// If it hasn't, make sure it's a word
		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			guessValue = guessInput.value;
			if (model.solvedWords.indexOf(guessValue) === -1){
				control.checkWord(guessValue);
			} else {
				alert(guessValue + ' you already solved this word');
			}
		});
	},
	buttonControls: function(){
		// Scramble word with [spacebar]
		document.body.onkeyup = function(e){
		    if(e.keyCode === 32){
		    	control.scramble(model.history[0]);
		    } else {
		    	return false;
		    }
		}
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
		        	// Show solved word, push to solved array, clear guess input
		        	userView.renderSolved(apiHeadWord);
		        	model.solvedWords.push(apiHeadWord);
		        	document.getElementById('guess-input').value = '';
		        } else {
		        	console.log(apiHeadWord + ' is not a word. byatch');
		        }
		    }
		    else {
		        alert('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	},
};
var userView = {
	init: function(){
		this.renderScramble();
	},
	// Display scrambled word
	renderScramble: function(){
		var wordScramble = document.getElementById('scramble');
		wordScramble.addEventListener('click', function(){ control.scramble(model.history[0]) } );
	},
	// Display solved words
	renderSolved: function(input){
		var solvedList = document.getElementById('solved-words'),
			wordItem = document.createElement('li');
			wordItem.innerHTML = input;

		solvedList.appendChild(wordItem);
	}
};

// Initialize Control
control.init();


