import { useState } from 'react';
import Cards from './Cards';

const MainScreen = () => {
  const [difficulty, setDifficulty] = useState(8);

    const handleDifficultyChange = (difficulty) => {
      setDifficulty(difficulty);
    };

  return (
    <div>
      <h1>Memory Game GOT</h1>
      <div className="maincontainer">
        <div className="btncontainer">
          <button onClick={() => handleDifficultyChange(8)} className={difficulty === 8 ? 'selected easy' : ''}>Easy</button>
          <button onClick={() => handleDifficultyChange(12)} className={difficulty === 12 ? 'selected medium' : ''}>Medium</button>
          <button onClick={() => handleDifficultyChange(15)} className={difficulty === 15 ? 'selected hard' : ''}>Hard</button>
        </div>

        <Cards difficulty={difficulty} />
      </div>
    </div>
  );
};

export default MainScreen;
