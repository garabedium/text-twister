var validWords = [];

function getData(){
		var xhr = new XMLHttpRequest();

		// apiKey: c5d2a89c760005c52147b0391090c56c56e325c46ef140d61
		// ex: url: http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
// http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=9999&minDictionaryCount=5&maxDictionaryCount=5&minLength=6&maxLength=6&limit=30&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

		var apiBase = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&',
			apiCorpusCount = 'minCorpusCount=9999&',
			apiMinDictCount = 'minDictionaryCount=5&',
			apiLetterLength = 'minLength=6&maxLength=6&',
			apiResultsLimit = 'limit=50&',
			apiKey = 'api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61',
			apiCall = apiBase + apiCorpusCount + apiMinDictCount + apiLetterLength + apiResultsLimit + apiKey;

		xhr.open('GET', ''+ apiCall +'');
		xhr.onload = function() {

			if (xhr.readyState == 4 && xhr.status == 200){

		 		var data = JSON.parse(xhr.responseText);

		 		//console.log(data);
		 		data.forEach(function(item){
		 			validateWords(item.word);
		 			//console.log(item.word)
		 		});

			}

		};
		xhr.send();
} getData();

function validateWords(input){
	var word = input;
	//var word = input.toLowerCase();
	var checkCase = word.search(/^[a-z]+$/);

	// var checkCase = input.search(/^[a-z]+$/);
	// Only save words that meet length and case requirements

	if (checkCase >= 0)  {
			validWords.push(word);
	}
}