import React from 'react';

import { gameStates } from '../../utils/constants';
import { AnagramsProps } from '../../utils/types';
import './Anagrams.scss';

function Anagrams(props: AnagramsProps) {
  const {
    gameStatus,
    anagrams,
    levelWordText,
  } = props;

  // Splits anagrams into columns for UI purposes:
  const chunkAnagrams = (array: JSX.Element[], chunkSize: number) => {
    const result = [];
    while (array.length) {
      result.push(array.splice(0, chunkSize));
    }
    return result;
  };

  const anagramsArray = Object.values(anagrams[levelWordText]);

  // Return word in list element:
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

  // Takes LI items and splits them into UL columns:
  const anagramColumns = chunkAnagrams(anagramsList, 4).map((col, i) => {
    const colKey = i;
    return <ul key={colKey} className="anagram-column">{col}</ul>;
  });

  return (anagramColumns.length) ? (
    <div className="anagrams-container">{anagramColumns}</div>
  ) : null;
}

export default Anagrams;
