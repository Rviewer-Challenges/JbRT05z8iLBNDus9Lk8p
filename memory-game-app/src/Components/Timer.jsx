import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Timer = ({ timeLeft, gameStarted, handleTimeout, stopGame }) => {
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  useEffect(() => {
    let timerId;
    if (gameStarted && timeLeft > 0) {
      timerId = setInterval(() => {
        handleTimeout();
      }, 1000);
    } else if (timeLeft === 0) {
        setShowTimeUpModal(true);
        clearInterval(timerId);
        handleTimeout();
        stopGame(); 
    }

    return () => clearInterval(timerId);
  }, [timeLeft, gameStarted, handleTimeout, stopGame]);

  const closeTimeUpModal = () => {
    setShowTimeUpModal(false);
    stopGame();
  };

  return (
    <div className="counter">
      Time Left: {timeLeft} seconds

      <Modal
        isOpen={showTimeUpModal}
        onRequestClose={closeTimeUpModal}
        contentLabel="Time is Up Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Time is up!</h2>
        <button onClick={closeTimeUpModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Timer;
