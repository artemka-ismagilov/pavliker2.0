function MenuLeft({ count, speedToIncrement, level, priceToUpdateSpeed, buyUpgrade, cheatForMe }){

    return(
    <div className="myFuns">
        <div>
          <h1>Passive income:</h1>
      <div className="stylingFuns">
          <h2>Current speed: {speedToIncrement}/s </h2>
          <h2>Level: {level}/15 </h2>
          <h2>Needed for purchase: {level < 15 ? `$${priceToUpdateSpeed}` : "max lvl"} </h2>
        </div>
        <div>
          <button className='upgradeBtn' onClick={buyUpgrade}>Upgrade</button>
          <button onClick={cheatForMe}>cash</button>
        </div>
      </div>
    </div>
    )
}

export default MenuLeft;