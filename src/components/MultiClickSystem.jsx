import { useState, useEffect } from 'react';


function MultiClickSystem({count, setCount, countInOneClick, setCountInOneClick, HandleKeyDown}){

    const [priceForClickUpgrade, setPriceForClickUpgrade] = useState(600);
    const [messageFromClick, setMessageFromClick] = useState('')

    function buyNewClick(){
        if(count >= priceForClickUpgrade){
          setCount((prevCount) => prevCount - priceForClickUpgrade)
          setCountInOneClick((prevCountInOneClick) => prevCountInOneClick + 1)
          setPriceForClickUpgrade((prevPriceForClickUpgrade) => prevPriceForClickUpgrade + 600)
        }
        if(count < priceForClickUpgrade){
            setMessageFromClick(`Not enough money! (you need $${priceForClickUpgrade})`)
        }
      }

      useEffect(() => {
        if (messageFromClick) {
          const timer = setTimeout(() => {
            setMessageFromClick('');
          }, 6500); 
          return () => clearTimeout(timer);
        }
      }, [messageFromClick]);

    return(
        <div className='multiClickSystem'>
            <h1>Multi-click:</h1>
            <h2>In one click: {countInOneClick} </h2>
            <h2>Needed for purchase: ${priceForClickUpgrade} </h2>
            {messageFromClick && <p>*{messageFromClick}*</p>}
            <button onKeyDown={HandleKeyDown} tabIndex='0' className='upgradeBtn' onClick={buyNewClick} >Buy click</button>
        </div>
    )
}


export default MultiClickSystem;