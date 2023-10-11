import { useState } from 'react';
import Cards from './Cards';

const MainScreen = () => {
  const [difficulty, setDifficulty] = useState(8);

    const handleDifficultyChange = (difficulty) => {
      setDifficulty(difficulty);
    };

    // const getGridClass = (difficulty) => {
    //   if (difficulty === 8) {
    //     return 'easy';
    //   } else if (difficulty === 12) {
    //     return 'medium';
    //   } else if (difficulty === 15) {
    //     return 'hard';
    //   }
    //   return '';
    // };

  return (
    <div>
      <h1>Memory Game GOT</h1>
      <div>
        <p>Select Difficulty:</p>
        <button onClick={() => handleDifficultyChange(8)} className={difficulty === 8 ? 'selected easy' : ''}>Easy</button>
        <button onClick={() => handleDifficultyChange(12)} className={difficulty === 12 ? 'selected medium' : ''}>Medium</button>
        <button onClick={() => handleDifficultyChange(15)} className={difficulty === 15 ? 'selected hard' : ''}>Hard</button>
      </div>
      {/* <div className={`${getGridClass(difficulty)}`}> */}
      <div>
        <Cards difficulty={difficulty} />
      </div>
    </div>
  );
};

export default MainScreen;
