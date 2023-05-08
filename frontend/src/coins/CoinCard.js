import React, {useContext, useState} from "react";
import "./CoinCard.css";
import UserContext from "../auth/UserContext";


function CoinCard({ id, symbol, price}) {

    const { hasFavoritedCoin, favoriteCoin } = useContext(UserContext);
    const [ favorited, setFavorite ] = useState();

    React.useEffect(function updateFavoriteStatus(){
        setFavorite(hasFavoritedCoin(id));
    }, [id, hasFavoritedCoin]);

    async function handleFavorite(evt) {
        if (hasFavoritedCoin(id)){
            return;
        }
        favoriteCoin(id);
        setFavorite(true);
    }

    return (
        <div className="CoinCard card"> {favorited}
            <div className="card-body">
                <h6 className="card-title">{symbol}</h6>
                {price && <div><small>Price: {formatPrice(price)}</small></div>}
                <button
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleFavorite}
                    disabled={favorited}
                >
                {favorited ? "Favorited" : "Favorite"}
                </button>
            </div>
        </div>
    );
}

/** Render integer price like '$1,250,343' */

function formatPrice(price) {
    const digitsRev = [];
    const priceStr = price.toString();
  
    for (let i = priceStr.length - 1; i >= 0; i--) {
      digitsRev.push(priceStr[i]);
      if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }
  
    return digitsRev.reverse().join("");
  }
  
  
export default CoinCard;