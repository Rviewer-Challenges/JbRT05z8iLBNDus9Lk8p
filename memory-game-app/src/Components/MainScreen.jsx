import { Link } from 'react-router-dom';

const MainScreen = () => {
  return (
    <div>
      <h1>Memory Game GOT</h1>
      <p>Welcome to the Game of Thrones Memory Game! Before you start, you can choose your preferred difficulty level: <strong>Easy</strong>, <strong>Medium</strong>, or <strong>Hard</strong>.</p>
      <div className="maincontainer">
        <div className="linkcontainer">
          <Link to="/easy" className="link">Easy</Link>
          <Link to="/medium" className="link">Medium</Link>
          <Link to="/hard" className="link">Hard</Link>
        </div>
      </div>
    
      <h2>How to Play:</h2>
      <ul>
          <li><strong>Start:</strong> The game begins with all cards face down. Click on the &quot;Start Game&quot; button to begin.</li>
          <li><strong>Reveal the Cards:</strong> Click on any card to reveal its content. Remember the image displayed.</li>
          <li><strong>Find a Match:</strong> Click on another card to find its matching pair. You need to remember where you saw the matching card.</li>
          <li><strong>Matching Cards:</strong> If the two cards you click on have matching content, they will remain face up.</li>
          <li><strong>Non-Matching Cards:</strong> If the cards you choose do not match, they will flip back face down. You should try to remember their positions for future attempts.</li>
          <li><strong>Continue Matching:</strong> Continue the process of revealing and matching cards.</li>
          <li><strong>Win the Game:</strong> Match all the pairs to reveal all the cards and win the game.</li>
      </ul>
      
      <div className="baner">
        <p>Enjoy the challenge of the Memory Game with your chosen difficulty level and test your memory skills with Game of Thrones-themed cards. <strong>Have fun!</strong></p>
      </div>
    </div>
  );
};

export default MainScreen;
