# Text Twist Javascript
- Recreating the classic Text Twist game using javascript and APIs

## How to Run
- Fork or download, open index.html
- Or, play online at garabedium.com/js/text-twist

## Caveats
- Yes, the solved word is stored, and accessible via the console.
- Thinking about adding a local dictionary to avoid querying the API at the start

## Roadmap
[X] - Validation: Select words that are only a-z: no periods, dashes, accents, capital letters etc
[X] - Validation: Remove letters from scrambled word that have already been taken
[X] - Game: Award points based on word size.
[] - Game: Set 90 second timer, hide game and offer reset when time runs out, or advance to next level
[] - Game: Levels: Advance automatically to next level if you solve a 6 letter word
[] - UI: Feedback if string isn't a valid word

## APIs
[Pearson Dictionary API](http://developer.pearson.com/apis/dictionaries)

## Credits
[Regex](http://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript)