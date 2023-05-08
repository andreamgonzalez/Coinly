import React from "react";
import CoinCard from "./CoinCard";

/** Show list of coin cards.
 *
 * Used by both CoinList and CoinDetail to list coins. Receives an apply
 * func prop which will be called by CoinCard on apply.
 *
 * CoinList -> CoinCardList -> CoinCard
 * CoinDetail -> CoinCardList -> CoinCard
 *
 */

function CoinCardList({ coins, favorite }) {
  console.debug("CoinCardList", "coins=", coins);

  return (
      <div className="CoinCardList">
        {coins.map(coin => (
            <CoinCard
                key={coin.id}
                id={coin.id}
                symbol={coin.symbol}
                price={coin.price}
            />
        ))}
      </div>
  );
}

export default CoinCardList;
