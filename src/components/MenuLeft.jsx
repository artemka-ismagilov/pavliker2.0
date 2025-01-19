function MenuLeft({ count, speedToIncrement, level, priceToUpdateSpeed, buyUpgrade, cheatForMe }){

    return(
        <div className="myFuns">
        <div>
          <h2>Current speed: {speedToIncrement}/s </h2>
          <h2>Level: {level}/15 </h2>
          <h2>Needed for purchase: {level < 15 ? `$${priceToUpdateSpeed}` : "max lvl"} </h2>
        </div>
        <div>
          <button onClick={buyUpgrade}>Upgrade</button>
          <button onClick={cheatForMe}>cash</button>
        </div>
      </div>
    )
}

export default MenuLeft;