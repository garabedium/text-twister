import React from 'react';

import './Anagrams.scss';

function Anagrams(props) {
  const { game, anagrams } = props;

  // Split anagrams into columns for UI purposes:
  const chunkAnagrams = (array, chunkSize) => {
    const result = [];
    while (array.length) {
      result.push(array.splice(0, chunkSize));
    }
    return result;
  };

  const anagramsList = anagrams.map((a) => {
    // Show the solved anagram if users solves, or game round ends:
    const showSolved = (a.solved || game.reset);

    // Split word into individual chars:
    const word = a.anagram.split('').map((char, i) => (
      <span
        key={i}
        className="char"
      >
        {(showSolved) ? char : '-'}
      </span>
    ));

    // Return word in list element:
    return (
      <li
        className={`anagram ${showSolved ? '--show' : ''} ${a.solved ? '--solved' : ''}`}
        data-testid={`anagram-${a.id}`}
        key={a.id}
      >
        {word}
      </li>
    );
  });

  const anagramsCols = chunkAnagrams(anagramsList, 4).map((col, i) => (<ul key={i} className="anagram-column">{col}</ul>));

  const showAnagrams = game.started && anagramsCols.length;

  return showAnagrams ? (
    <div className="anagrams-container">{anagramsCols}</div>
  ) : null;
}

export default Anagrams;
