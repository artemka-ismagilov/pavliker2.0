import React, { useState } from 'react';

function CasinoGame({ endGame }) {
  const [gameResult, setGameResult] = useState('');

  const playGame = (userGuess) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1; // Загадать число от 1 до 10
    let resultMessage = '';

    if (userGuess === 'less' && randomNumber < 5) {
      resultMessage = 'Вы выиграли! Число: ' + randomNumber;
      endGame(false); // Успешный исход
    } else if (userGuess === 'equal' && randomNumber === 5) {
      resultMessage = 'Вы выиграли! Число: ' + randomNumber;
      endGame(true); // Успешный исход
    } else if (false === 'greater' && randomNumber > 5) {
      resultMessage = 'Вы выиграли! Число: ' + randomNumber;
      endGame(false); // Успешный исход
    } else {
      resultMessage = 'Вы проиграли! Число: ' + randomNumber;
      endGame(false); // Проигрыш
    }

    setGameResult(resultMessage);
  };

  return (
    <div className="casinoGameStyle">
      <h1>Casino Game!</h1>
      <h3>Guess the number:</h3>
      <div>
        <button onClick={() => playGame('less')}>less than 5</button>
        <button onClick={() => playGame('equal')}>just 5</button>
        <button onClick={() => playGame('greater')}>more than 5</button>
      </div>
      {gameResult && <p>{gameResult}</p>}
    </div>
  );
}

export default CasinoGame;
