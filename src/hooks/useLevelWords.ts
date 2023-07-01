import {
  useState, useEffect, useCallback, useReducer,
} from 'react';
import { GameStatus } from '../types/game.interface';
import { gameStates } from '../utils/constants.util';
import { LevelWord } from '../types/level-word.interface';
import { buildLevelWordZipfQuery } from '../utils/methods.util';
import LevelWordService from '../services/level-word.service';

// export interface UseLevelWords {
//   gameStatus: GameStatus
// }

function useLevelWords(gameStatus: GameStatus) {
  // const { gameStatus } = props;
  const [levelWords, setLevelWords] = useState<LevelWord[]>([]);

  // const doThing = useCallback(
  //   (result: LevelWord) => {
  //     setLevelWords((prevState) => [...prevState, result]);
  //   },
  //   [],
  // );

  // to try: using prevState for unused

  useEffect(() => {
    const getLevelWord = async () => {
      const query = buildLevelWordZipfQuery();
      const result = await LevelWordService.getByZipfRange(query);

      setLevelWords((prevState) => {
        const status = !prevState.length ? 'current' : 'next';
        result.status = status;
        return [...prevState, result];
      });
    };
    if (gameStatus === gameStates.inactive || gameStatus === gameStates.paused) {
      getLevelWord().catch(() => {});
    }
  }, [gameStatus]);

  return [levelWords];
}

export default useLevelWords;
