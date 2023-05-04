import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import CoinlyApi from "../api/api";
import CoinCardList from "./CoinCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Gets Coins from API on mount and displays them in a list.
 * Re-loads filtered coins on submit from search form.
 * API route /coins
 */

function CoinList() {
  // console.debug("CoinList");

  const [coins, setCoins] = useState(null);

  useEffect(function getAllCoinsOnMount() {
    // console.debug("CoinList useEffect getAllCoinsOnMount");
    search();
  }, []);

  /** Returns coins that match the search title submitted. */
  async function search(symbol) {
    let coins = await CoinlyApi.getCoins(symbol);
    console.log(coins);
    setCoins(coins);
  }
  if (coins) return <LoadingSpinner />;
  // return (
  //     <div className="CoinList col-md-8 offset-md-2">
  //       <Search searchFor={search} />
  //       {coins.length
  //           ? <CoinCardList coins={coins} />
  //           : <p className="lead">Sorry, no results were found!</p>
  //       }
  //     </div>
  // );
}

export default CoinList;
