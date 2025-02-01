import { useEffect, useState } from 'react';
import MenuLeft from './components/MenuLeft';
import IncrementButton from './components/IncrementButton';
import HandleKeyDown from './components/HandleKeyDown';
import promoCodes, { superPromoCode } from './components/promoCodes';
import MultiClickSystem from './components/MultiClickSystem';
import BottomPanel from './components/BottomPanel';
import CasinoGame from './components/CasinoGame';
import PromoCodeChecker from './components/PromoCodeChecker';
import './App.css';

function App() {
  const [count, setCount] = useState(990);
  const [speedToIncrement, setSpeedToIncrement] = useState(3000);
  const [priceToUpdateSpeed, setPriceToUpdateSpeed] = useState(300);
  const [level, setLevel] = useState(1);
  const [enterPromo, setEnterPromo] = useState('');
  const [rewardMessage, setRewardMessage] = useState('');
  const [lastPromoTime, setLastPromoTime] = useState(0);
  const [timeUntilNextPromo, setTimeUntilNextPromo] = useState(0);
  const [countInOneClick, setCountInOneClick] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);

  function incrementCounter() {
    setCount((prevCount) => prevCount + countInOneClick);
  }

  function incrementCounterInterval() {
    if (!isGameActive) {
      setCount((prevCount) => prevCount + 1);
    }
  }

  function startGame() {
    setIsGameActive(true);
  }

  function endGame(won, number) {
    if (won) {
      if (number === 5) {
        setCount((prevCount) => prevCount + 1500); // 1500 монет за число 5
        setIsGameActive(false)
      } else {
        setCount((prevCount) => prevCount + 1000); // 1000 монет за любое другое выигрышное число
        setIsGameActive(false)
      }
    } else {
      setCount((prevCount) => Math.max(prevCount - 500, 0)); // Уменьшаем на 500, но не ниже 0
      setIsGameActive(false)
    }
    setIsGameActive(false);
  }

  function buyUpgrade() {
    if (count >= priceToUpdateSpeed && level < 15) {
      setCount((prevCount) => prevCount - priceToUpdateSpeed);
      setSpeedToIncrement((prevSpeed) => prevSpeed - 200);
      setPriceToUpdateSpeed((prevPrice) => prevPrice + 300);
      setLevel((prevLevel) => prevLevel + 1);
    }
  }

  function cheatForMe() {
    setCount(66650);
  }

  useEffect(() => {
    const interval = setInterval(incrementCounterInterval, speedToIncrement);
    return () => clearInterval(interval);
  }, [speedToIncrement, isGameActive]);

  useEffect(() => {
    if (count === 66666) {
      window.location.reload();
    }
  }, [count]);

  useEffect(() => {
    if (rewardMessage) {
      const timer = setTimeout(() => {
        setRewardMessage('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [rewardMessage]);

  // Запуск казино игры автоматически при достижении 1000 монет
  useEffect(() => {
    if (count >= 1000 && !isGameActive) {
      setIsGameActive(true);
    }
  }, [count, isGameActive]);

  return (
    <>
      <div className='allObjects'>
        <h1>Pavliker 2.0</h1>
        <div onKeyDown={HandleKeyDown} tabIndex='0'>
          <IncrementButton increment={incrementCounter} />
          <h2 className='countStyle'>${count}</h2>
        </div>
      </div>
      <MenuLeft
        count={count}
        speedToIncrement={speedToIncrement}
        level={level}
        priceToUpdateSpeed={priceToUpdateSpeed}
        buyUpgrade={buyUpgrade}
        cheatForMe={cheatForMe}
      />
      <MultiClickSystem 
        count={count}
        setCount={setCount}
        countInOneClick={countInOneClick}
        setCountInOneClick={setCountInOneClick}
        HandleKeyDown={HandleKeyDown}
      />
      {isGameActive && (
        <CasinoGame endGame={endGame} />
      )}
      <PromoCodeChecker
        enterPromo={enterPromo}
        setEnterPromo={setEnterPromo}
        setRewardMessage={setRewardMessage}
        setCount={setCount}
        setLastPromoTime={setLastPromoTime}
        setTimeUntilNextPromo={setTimeUntilNextPromo}
        lastPromoTime={lastPromoTime}
        timeUntilNextPromo={timeUntilNextPromo}
        superPromoCode={superPromoCode}
        promoCodes={promoCodes}
      />
      {rewardMessage && <p>{rewardMessage}</p>}
      {timeUntilNextPromo > 0 && (
        <p>{`Time until entry: ${timeUntilNextPromo} seconds`}</p>
      )}
    <BottomPanel />
    </>
  );
}

export default App;

// soon...
