	// Pearson API: http://developer.pearson.com/apis/dictionaries
	// Ex: http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20

// Text Twist Readme:
/*
	Basic App Flow:
		- Call Dictionary API, get a list of words
		- Choose a single word, shuffle and display it to user
		- User guesses
	Future:
		- This version stores the original word instead of re-querying the API
		- Would need to requery the API for other 6 letter solves
*/
var model = {
	dictionary:[],
	history:[],
};
var control = {
	// Initiate Views & Get Data (API Call)
	// Call select word which contains getData? Or call getData outright?
	init: function(){
		userView.init();
		this.getData();
		this.guessWord();
		this.buttonControls();
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

		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			var solve = model.history;

			if (guessInput.value == solve){
				// Get points, clear displays
				console.log('good job');
				guessDisplay.innerHTML='';
				guessInput.value='';
			} else {
				// No points, clear displays
				guessDisplay.innerHTML='';
				guessInput.value='';
			}
		});
		guessInput.onkeyup = function(){
			guessDisplay.innerHTML= guessInput.value;
			// This should call a view
		}
	},
	buttonControls: function(){
		document.body.onkeyup = function(e){
		    if(e.keyCode == 32){
		    	control.scramble(model.history[0]);
		    }
		}
	},
};
// userView displays: scrambled word header,
var userView = {
	init: function(){
		this.render();
	},
	render: function(){
		//var wordScramble = document.getElementById('re-scramble');
		//wordScramble.addEventListener('click', function(){ control.scramble(model.history) });
		//wordScramble.addEventListener('click', function(){alert('lorem')} );
		var wordScramble = document.getElementById('re-scramble');
		wordScramble.addEventListener('click', function(){ control.scramble(model.history[0]) } );
	},
};

// Initialize Control
control.init();


