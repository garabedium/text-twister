# Text Twist Javascript
- Recreating the classic Text Twist game using pure javascript and the Pearson Dictionary API

## Getting Started
- Fork or download, open index.html
- Or, play online at garabedium.com/js/text-twist

## Rules
- Solve as many words as you can before time runs out!
- Words must have a minimum of 3 letters.
- Solve the 6 letter word and advance to the next level.

## Game Controls
- Press 'Spacebar' to scramble the letters.
- Press 'Enter' to solve a word.

## Known Issues
- Yes, the solved word is accessible via the console. No, cheaters never win.
- The app uses the Pearson Dictionary API
- Thinking about adding a local dictionary to avoid querying the API at the start
- If you control + a, command + a and clear the input, you'll be "locked out", those letters won't be available.

## Roadmap / Bugs
[] - API: Can't split undefined (line:69)
[] - Case: control/command + a + backspace: letters removed and never added back
	-- Check if input is blank.
[] - API: error handling
[X] - If a word is solved, reset removed letters

## Roadmap
[] - Game: Levels: Advance automatically to next level if you solve a 6 letter word
[] - Sort solved words
[X] - Validation: Select words that are only a-z: no periods, dashes, accents, capital letters etc
[X] - Validation: Remove letters from scrambled word that have already been taken
[X] - Game: Award points based on word size.
[X] - Game: Set 90 second timer
[X] - Remove six letter word from dictionary if solved
[X] - UI: Feedback if string isn't a valid word

## APIs
[Pearson Dictionary API](http://developer.pearson.com/apis/dictionaries)

## Credits & Documentation
[Regex](http://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript)