import { useState, useEffect } from 'react';
import LevelWordService from '../services/level-word.service';

// Custom hook that fetches a LevelWord from the database
// props: query?

// function reducer(state, action) {
//   switch (action.type) {
//     case 'zipfRange': {

//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

function useGetLevelWord(initialQuery) {
  const [data, setData] = useState({});
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await LevelWordService.getByZipfRange(query);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().then(() => {}).catch(() => {});
  }, [query]);

  return [data, setQuery];
}

export default useGetLevelWord;
