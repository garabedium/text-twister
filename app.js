	// Pearson API: http://developer.pearson.com/apis/dictionaries
	// Ex: http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20

var model = {
	dictionary:[],
	history:[],
	solved:[],
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

		var apiBase = 'http://api.pearson.com/v2/dictionaries/ldoce5/entries?';
		var apiOffsetLimit = 33486;
		var apiRandomOffset = '&offset=' + Math.floor(Math.random() * (apiOffsetLimit - 0) + 0);
		var apiResultLimit = 100;

		xhr.open('GET', ''+ apiBase + apiRandomOffset +'&limit='+ apiResultLimit +'');
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

		// Only accept letters in the word and Enter
		guessInput.onkeypress = function(e){
			var char = e.key;
			var word = model.history[0];

			if ( word.indexOf(char) === -1 && e.keyCode !== 13){
				e.preventDefault();
			}
		};

		guessForm.addEventListener('submit', function(e){
			e.preventDefault();
			guessValue = guessInput.value;
			control.checkWord(guessValue);
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
		        	model.solved.push(apiHeadWord);
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


