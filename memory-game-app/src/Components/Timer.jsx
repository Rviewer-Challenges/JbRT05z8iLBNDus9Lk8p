import { useEffect } from 'react';

const Timer = ({ timeLeft, gameStarted, handleTimeout, stopGame }) => {
  useEffect(() => {
    let timerId;
    if (gameStarted && timeLeft > 0) {
      timerId = setInterval(() => {
        handleTimeout();
      }, 1000);
    } else if (timeLeft === 0) {
        alert('Time is up! From TIMER');
        clearInterval(timerId);
        handleTimeout();
        stopGame(); 
    }

    return () => clearInterval(timerId);
  }, [timeLeft, gameStarted, handleTimeout, stopGame]);

  return (
    <div className="counter">
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;
