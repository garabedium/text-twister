import React from 'react';

import { gameStates } from '../../utils/constants';
import './Anagrams.scss';

function Anagrams({ gameStatus, anagrams, levelWordText }) {
  // Splits anagrams into columns for UI purposes:
  const chunkAnagrams = (array, chunkSize) => {
    const result = [];
    while (array.length) {
      result.push(array.splice(0, chunkSize));
    }
    return result;
  };

  const anagramsArray = Object.values(anagrams[levelWordText]);

  const anagramsList = anagramsArray.map((a) => {
    // Show the solved anagram if users solves, or game round ends:
    const showSolved = (a.solved || gameStatus === gameStates.paused);

    // Split word into individual chars:
    const word = a.anagram.split('').map((char, i) => {
      const charKey = `${char}_${i}`;
      return (
        <span
          key={charKey}
          className="char"
        >
          {(showSolved) ? char : '-'}
        </span>
      );
    });

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

  const anagramsCols = chunkAnagrams(anagramsList, 4).map((col, i) => {
    const colKey = i;
    return <ul key={colKey} className="anagram-column">{col}</ul>;
  });
  const showAnagrams = anagramsCols.length;

  return showAnagrams ? (
    <div className="anagrams-container">{anagramsCols}</div>
  ) : null;
}

export default Anagrams;
