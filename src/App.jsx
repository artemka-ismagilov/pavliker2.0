import { useEffect, useState } from 'react';
import MenuLeft from './components/MenuLeft';
import IncrementButton from './components/IncrementButton';
import HandleKeyDown from './components/HandleKeyDown';
import promoCodes, { superPromoCode } from './components/promoCodes';
import MultiClickSystem from './components/MultiClickSystem';
import PromoCodeChecker from './components/PromoCodeChecker';
import './App.css';

function App() {
  const [count, setCount] = useState(1000);
  const [speedToIncrement, setSpeedToIncrement] = useState(3000);
  const [priceToUpdateSpeed, setPriceToUpdateSpeed] = useState(300);
  const [level, setLevel] = useState(1);
  const [enterPromo, setEnterPromo] = useState('');
  const [rewardMessage, setRewardMessage] = useState('');
  const [lastPromoTime, setLastPromoTime] = useState(0);
  const [timeUntilNextPromo, setTimeUntilNextPromo] = useState(0);
  const [countInOneClick, setCountInOneClick]= useState(1)

  function incrementCounter() {
    setCount((prevCount) => prevCount + countInOneClick);
  }
  function incrementCounterInterval() {
    setCount((prevCount) => prevCount + 1);
  }


  // add a promo code system - done
  // the function of checking the input of the correct word - done
  // add a multi-click system for an increased cost - done
  
  // optimize the code - almost done
  // break the App into components - almost done

  // add a language change*
  // add random events for a prize*
  // add a display of the time spent after updating the page
  // добавить казино игру, типо чтобы от неё нельзя было отказаться, за луз -деньги, за вин +деньги

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
  }, [speedToIncrement]);

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
    </>
  );
}

export default App;

// soon...
