import {
  useEffect, useReducer,
} from 'react';
import { GameStatus } from '../types/game.interface';
import { gameStates, wordStates } from '../utils/constants.util';
import { LevelWord } from '../types/level-word.interface';
import { buildLevelWordZipfQuery } from '../utils/methods.util';
import LevelWordService from '../services/level-word.service';

function levelWordReducer(state: LevelWord[], action: { type: string, result: LevelWord }) {
  switch (action.type) {
    case 'level_word': {
      const { result } = action;
      result.status = !state.length ? wordStates.current : wordStates.next;
      return [...state, result];
    }
    default: {
      throw new Error(`Undefined type: ${action.type}`);
    }
  }
}

function useLevelWords(gameStatus: GameStatus) {
  const [levelWords, dispatch] = useReducer(levelWordReducer, []);

  const getLevelWord = async () => {
    const query = buildLevelWordZipfQuery();
    const result = await LevelWordService.getByZipfRange(query);
    dispatch({ type: 'level_word', result });
  };

  useEffect(() => {
    if (gameStatus === gameStates.inactive || gameStatus === gameStates.paused) {
      getLevelWord().catch(() => {});
    }
  }, [gameStatus]);

  return [levelWords];
}

export default useLevelWords;
