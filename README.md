# Text Twist Javascript
- Recreating the classic [Text Twist](http://zone.msn.com/en/texttwist/) game using pure javascript
- Words sourced from [Wordnik dictionary](http://developer.wordnik.com/docs.html)

## Getting Started
- Fork or download, open index.html
- Or, play online at garabedium.com/projects/text-twister

## Rules
- Solve as many words as you can before time runs out!
- Words must have a minimum of 3 letters.
- Solve the 6 letter word and advance to the next level.

## Game Controls
- Press 'Spacebar' to scramble the letters.
- Press 'Enter' to solve a word.

## Known Issues
- Yes, the solved word is accessible via the console. No, cheaters never win.
- Letters sometimes get locked out.

## Roadmap / Bugs
[] - API: Can't split undefined (line:69)
[X] - Case: control/command + a + backspace: letters removed and never added back
	-- Check if input is blank.
[] - API: error handling
[] - Disable scramble while game is paused (between levels or about to reset)
[X] - If a word is solved, reset removed letters

## Roadmap
[] - If dictionary runs low, requery API
[] - Include word definitions
[X] - Game: Levels: Advance automatically to next level if you solve a 6 letter word
[] - Sort solved words
[X] - Validation: Select words that are only a-z: no periods, dashes, accents, capital letters etc
[X] - Validation: Remove letters from scrambled word that have already been taken
[X] - Game: Award points based on word size.
[X] - Game: Set 90 second timer
[X] - Remove six letter word from dictionary if solved
[X] - UI: Feedback if string isn't a valid word

## Credits & Documentation
[Dictionary API by Wordnik](http://developer.wordnik.com/docs.html)
[Material Icons by Google](https://design.google.com/icons/)
[Regex](http://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript)
[]