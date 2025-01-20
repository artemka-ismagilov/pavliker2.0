import { useEffect, useState } from 'react';
import MenuLeft from './components/MenuLeft'
import IncrementButton from './components/IncrementButton';
import HandleKeyDown from './components/HandleKeyDown';
import promoCodes, { superPromoCode } from './components/promoCodes';
import './App.css';

function App() {
  const [count, setCount] = useState(100);
  const [speedToIncrement, setSpeedToIncrement] = useState(3000);
  const [priceToUpdateSpeed, setPriceToUpdateSpeed] = useState(300);
  const [level, setLevel] = useState(1);
  const [enterPromo, setEnterPromo] = useState('');
  const [rewardMessage, setRewardMessage] = useState('');
  const [lastPromoTime, setLastPromoTime] = useState(0);
  const [timeUntilNextPromo, setTimeUntilNextPromo] = useState(0);

  function incrementCounter() {
    setCount(prevCount => prevCount + 1);
  }

  // add a promo code system - done
  // the function of checking the input of the correct word - done


  // add a multi-fork system for an increased cost
  // optimize the code
  // break the App into components

  function buyUpgrade() {
    if (count >= priceToUpdateSpeed && level < 15) {
      setCount(prevCount => prevCount - priceToUpdateSpeed);
      setSpeedToIncrement(prevSpeed => prevSpeed - 200);
      setPriceToUpdateSpeed(prevPrice => prevPrice + 300);
      setLevel(prevLevel => prevLevel + 1);
    }
  }
  function cheatForMe(){
    setCount(66650)
  }

  function checkPromoCode() {
    const currentDate = Date.now();
    if(currentDate - lastPromoTime < 60000){
      setRewardMessage("You can only enter a promocode once a minute!")
      return;
    }

    const trimmedPromo = enterPromo.trim();
    let isValidPromo = false;

    // Сначала проверяем суперпромокод
    if (trimmedPromo === superPromoCode) {
        setRewardMessage(`Cheers! Superpromo: ${superPromoCode}`);
        setCount(prevCount => prevCount + 300);
        isValidPromo = true;
    } else if (promoCodes.includes(trimmedPromo)) {
        // Затем проверяем обычные промокоды
        setRewardMessage(`You won! Word: ${trimmedPromo}`);
        setCount(prevCount => prevCount + 150);
        isValidPromo = true;
    } else {
        setRewardMessage("You lose :(");
    }
    if (isValidPromo) {
      setLastPromoTime(currentDate);
      setTimeUntilNextPromo(60);
    }
}

  useEffect(() => {
    const interval = setInterval(incrementCounter, speedToIncrement);
    return () => clearInterval(interval);
  }, [speedToIncrement]);

  useEffect(()=>{
    if(count === 66666){
      window.location.reload()
    }
  },[count])

  useEffect(()=>{
    let timer;
    if(timeUntilNextPromo > 0){
      timer = setInterval(()=>{
        setTimeUntilNextPromo(prevTime=>prevTime-1)
      },1000)
    }
    return () => clearInterval(timer);
  }, [timeUntilNextPromo])
  return (
    <>
      <div className="allObjects">
        <h1>Pavliker 2.0</h1>
        <div
          onKeyDown={HandleKeyDown}
          tabIndex="0"
        >
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
      <h2>Enter promocode</h2>
      <input value={enterPromo} type="text" onChange={(e)=>setEnterPromo(e.target.value)} className='promocodeStyle' placeholder='here' />
      <button disabled={timeUntilNextPromo > 0} className='checkPromoStyle' onClick={checkPromoCode} style={{ display: 'block' }}>check!</button>
      {rewardMessage && <p>{rewardMessage}</p>}
      {timeUntilNextPromo > 0 && (
        <p>{`Time until entry: ${timeUntilNextPromo} seconds`}</p>
      )}
    </>
  );
}

export default App;


// soon...