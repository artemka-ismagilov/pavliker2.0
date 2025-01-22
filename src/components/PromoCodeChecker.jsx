import { useEffect } from 'react';
import promoCodes, { superPromoCode } from './promoCodes';

function PromoCodeChecker({
  enterPromo,
  setEnterPromo,
  setRewardMessage,
  setCount,
  setLastPromoTime,
  setTimeUntilNextPromo,
  lastPromoTime,
  timeUntilNextPromo,
}) {
  const checkPromoCode = () => {
    const currentDate = Date.now();

    if (currentDate - lastPromoTime < 60000) {
      setRewardMessage("You can only enter a promo code once a minute!");
      return;
    }

    const trimmedPromo = enterPromo.trim();
    let isValidPromo = false;

    // Проверяем суперпромокод
    if (trimmedPromo === superPromoCode) {
      setRewardMessage(`Cheers! Super promo: ${superPromoCode}`);
      setCount((prevCount) => prevCount + 300);
      isValidPromo = true;
    } else if (promoCodes.includes(trimmedPromo)) {
      // Проверяем обычные промокоды
      setRewardMessage(`You won! Code: ${trimmedPromo}`);
      setCount((prevCount) => prevCount + 150);
      isValidPromo = true;
    } else {
      setRewardMessage("You lose :(");
    }

    // Если промокод действителен, обновляем время последнего ввода
    if (isValidPromo) {
      setLastPromoTime(currentDate);
      setTimeUntilNextPromo(60); 
    }

    setEnterPromo("");
  };

  useEffect(() => {
    let timer;
    if (timeUntilNextPromo > 0) {
      timer = setInterval(() => {
        setTimeUntilNextPromo((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeUntilNextPromo]);

  return (
    <div>
      <h2>Enter promocode</h2>
      <input
        value={enterPromo}
        type="text"
        onChange={(e) => setEnterPromo(e.target.value)}
        className='promocodeStyle'
        placeholder='here'
      />
      <button
        disabled={timeUntilNextPromo > 0}
        className='checkPromoStyle'
        onClick={checkPromoCode}
        style={{ display: 'block' }}
      >
        Check!
      </button>
    </div>
  );
}

export default PromoCodeChecker;
