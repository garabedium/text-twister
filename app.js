	// Pearson API: http://developer.pearson.com/apis/dictionaries
	// Ex: http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20

// Call dictionary api, get some words
var dictionary = [];
var wordCandidates = [];
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.pearson.com/v2/dictionaries/ldoce5/entries?part_of_speech=noun%2Cverb&offset=2&limit=20');
xhr.onload = function() {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        	data = data.results;
        	//console.log(data);
        	//console.log(data.results[0].headword);
			data.forEach(function(item) {
				item = item.headword;
				dictionary.push(item);
			});
			findCandidates();
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

function findCandidates(){
	dictionary.forEach(function(item){
		//console.log(item + ' - ' + item.length);
		maxLength = 6;
		if (item.length === maxLength){
			wordCandidates.push(item);
		}
	})
};

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

	function someAlert(){
		alert('match');
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