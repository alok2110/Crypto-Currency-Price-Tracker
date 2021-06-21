import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoin] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        // console.log(res.data);
        setCoin(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  console.log(filteredCoin);
  return (
    <>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              type="text"
              value={search}
              placeholder="Search a currency"
              className="coin-input"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        {filteredCoin.map((coin, index) => {
          return <Coin key={index} coin={coin} />;
        })}
      </div>
    </>
  );
}

export default App;
