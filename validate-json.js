var validWords = [];


	apiBase = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&',
	//apiBase = '',
	apiCorpusCount = 'minCorpusCount=9999&',
	apiMinDictCount = 'minDictionaryCount=5&',
	apiLetterLength = 'minLength=6&maxLength=6&',
	apiResultsLimit = 'limit=50&',
	apiKey = 'api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61',
	apiCall = apiBase + apiCorpusCount + apiMinDictCount + apiLetterLength + apiResultsLimit + apiKey;
	//apiCall = 'http://api.wordnik.com:80/v4/word.json/kibblzenbit/definitions?limit=1&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61';


	fetch('/src/json/sample-words.json')
	  .then(
	    function(response) {
	      if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	        return;
	      }

	      // Examine the text in the response
	      response.json().then(function(data) {
	        ///console.log(data.results);
	      });
	    }
	  )
	  .catch(function(err) {
	    console.log(err);
	  });




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