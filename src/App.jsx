import { useEffect, useState } from 'react';
import MenuLeft from './components/MenuLeft'
import IncrementButton from './components/IncrementButton';
import HandleKeyDown from './components/HandleKeyDown';
import promoCodes from './components/promoCodes';
import './App.css';

function App() {
  const [count, setCount] = useState(100);
  const [speedToIncrement, setSpeedToIncrement] = useState(3000);
  const [priceToUpdateSpeed, setPriceToUpdateSpeed] = useState(300);
  const [level, setLevel] = useState(1);
  const [enterPromo, setEnterPromo] = useState();

  function incrementCounter() {
    setCount(prevCount => prevCount + 1);
  }

  // add a promo code system
  // the function of checking the input of the correct word


  function buyUpgrade() {
    if (count >= priceToUpdateSpeed && level < 15) {
      setCount(prevCount => prevCount - priceToUpdateSpeed);
      setSpeedToIncrement(prevSpeed => prevSpeed - 200); // Уменьшаем скорость
      setPriceToUpdateSpeed(prevPrice => prevPrice + 300); // Увеличиваем цену
      setLevel(prevLevel => prevLevel + 1); // Увеличиваем уровень
    }
  }
  function cheatForMe(){
    setCount(66650)
  }

  useEffect(() => {
    const interval = setInterval(incrementCounter, speedToIncrement);
    return () => clearInterval(interval);
  }, [speedToIncrement]); // Добавляем speedToIncrement как зависимость

  useEffect(()=>{
    if(count === 66666){
      window.location.reload()
    }
  },[count])
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
      <input value={enterPromo} type="text" className='promocodeStyle' placeholder='here' />
      <button className='checkPromoStyle' style={{ display: 'block' }}>check!</button>
    </>
  );
}

export default App;


// soon...