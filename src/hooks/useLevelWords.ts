import {
  useEffect, useReducer,
} from 'react';
import { GameStatus } from '../types/game.interface';
import { gameStates, nextwordStates, wordStates } from '../utils/constants.util';
import { LevelWord, LevelWordStatus, LevelWordsReducerAction } from '../types/level-word.interface';
import { buildLevelWordZipfQuery } from '../utils/methods.util';
import LevelWordService from '../services/level-word.service';

function levelWordReducer(state: LevelWord[], action: LevelWordsReducerAction) {
  switch (action.type) {
    // Adds new LevelWord to state. First added word has status 'current'.
    case 'added': {
      const { payload } = action;
      payload.status = !state.length ? wordStates.current : wordStates.next;
      return [...state, payload];
    }
    // Updates status based on word's current status.
    case 'status_updated': {
      const updatedStatuses = state.map((word: LevelWord) => ({
        ...word, status: nextwordStates[word.status] as LevelWordStatus,
      }));
      return updatedStatuses;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

function useLevelWords(gameStatus?: GameStatus) {
  const [levelWords, dispatch] = useReducer(levelWordReducer, []);
  const currentWord = levelWords.filter((word) => word.status === wordStates.current)[0];
  const hasLevelWord = currentWord?.word !== undefined;

  const getLevelWord = async () => {
    const query = buildLevelWordZipfQuery();
    const result = await LevelWordService.getByZipfRange(query);
    dispatch({ type: 'added', payload: result });
  };

  const updateLevelWordStatuses = () => {
    dispatch({ type: 'status_updated' });
  };

  useEffect(() => {
    if (gameStatus === gameStates.inactive || gameStatus === gameStates.paused) {
      getLevelWord().catch(() => {});
    }
  }, [gameStatus]);

  return {
    levelWords, currentWord, hasLevelWord, updateLevelWordStatuses,
  };
}

export default useLevelWords;
