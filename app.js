	// Pearson API: http://developer.pearson.com/apis/dictionaries
	// Ex: http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20

// MVC Pattern:
// Separation of concerns
/*
	Model: Data
	View: Interactions with user
	Control: Communicates between model and views
*/
var model = {
	dictionary:[],
	history:[],
};
var control = {
	// Initiate Views & Get Data
	init: function(){
		userView.init();
		this.getData();
	},
	getData: function(){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20');
		xhr.onload = function() {
		    if (xhr.status === 200) {
		        var data = JSON.parse(xhr.responseText);
		        	data = data.results;

					data.forEach(function(item) {
						item = item.headword;
						maxLength = 6;
						// Only pull words that meet length requirement
						if (item.length === maxLength){
							model.dictionary.push(item);
						}
					});
					control.selectWord();
		    }
		    else {
		        alert('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	},
	selectWord: function(){
		// Select random word from dictionary array
		var randomWord = model.dictionary[Math.round( Math.random() * (model.dictionary.length-1))];
		// Pass random word to be scrambled
		// Save original word for future use
		this.scramble(randomWord);
		model.history.push(randomWord);
	},
	scramble: function(array){

		// Convert word to array
		array = array.split('');

	    var counter = array.length,
	    	word = '';

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

	    // Validation:
	    // Make sure solved word isn't shown
	    if ( word != wordOriginal ){
	    	return showHeader(word);
	    } else {
	    	console.log('match:' + word);
	    	return this.scramble();
	    }

		//scramble();
	},
};
// userView displays: scrambled word header,
var userView = {
	init: function(){
		this.render();
	},
	render: function(){
		//this.smth = control.doSmth();
	},
};

// Initialize Control
control.init();

// Call dictionary api, get some words
//var dictionary = [];

	// Declare some vars
	var wordStatic = 'window',
		wordOriginal = '',
		wordScramble = document.getElementById('scramble'),
		scrambleHistory = [],
		wordHeader = document.getElementById('word-header'),
		guessForm = document.getElementById('guess-form'),
		guessWord = document.getElementById('guess-word'),
		guessDisplay = document.getElementById('guess-display'),
		guessSubmit = document.getElementById('guess');

	// Copy original word
	// Convert wordStatic to array
		wordOriginal = wordStatic;
		wordStatic = wordStatic.split('');

	// Shuffle word array
		var scramble = function(array) {
			var array = wordStatic;

		    var counter = array.length,
		    	word = '';

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
		   	scrambleHistory.push(word);

		    // Validation:
		    // Make sure solved word isn't shown
		    if ( word != wordOriginal ){
		    	return showHeader(word);
		    } else {
		    	console.log('match:' + word);
		    	return scramble();
		    }
		}; scramble();

	function showHeader(input){
		wordHeader.innerHTML=input;
	}

	// User scramble event handler
	wordScramble.addEventListener('click', scramble);

	// User Guess form
	// Take guessWord and compare to originalWord
	guessForm.addEventListener('submit', function(e){
		e.preventDefault();
		var userInput = guessWord.value;

		if (userInput == wordOriginal){
			// Get points
		} else {
			// Animate and clear display
			guessDisplay.innerHTML='';
		}
	});

	guessWord.onkeyup = function(){
		guessDisplay.innerHTML= guessWord.value;
	}