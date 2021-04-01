import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import "./App.css";
import Navbar from "./components/Navbar";
import RegisterHouse from "./RegisterHouse";
import Rental from "./Rental";
import { getHouses } from "./zilliqa";

function App() {
  const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState(0);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const initContract = async () => {
      if (window.zilPay) {
        const isConnect = await window.zilPay.wallet.connect();
        if (isConnect) {
          const account = window.zilPay.wallet.defaultAccount;
          const balance = await zilliqa.blockchain.getBalance(account.base16);
          setAddress(account.base16);
          setBalance(balance.result.balance / 1000000000000);
          console.log(`acctx16 = ${account.base16}`);
          localStorage.setItem("address", account.base16);
          localStorage.setItem(
            "balance",
            balance.result.balance / 1000000000000
          );
        } else {
          throw new Error("user rejected");
        }
        const _houses = await getHouses();
        setHouses(_houses);
        localStorage.setItem("houses", JSON.stringify(_houses));

      } else {
//        improvement - setTimeOut then loop back to see if window.zilPay is avail
        console.log(`window.zilPay is undefined`);
        setAddress(localStorage.getItem("address"));
        setBalance(localStorage.getItem("balance"));
        setHouses(JSON.parse(localStorage.getItem("houses")));
      }
    };
    console.log(`app ${address} ${houses}`);

    initContract();
  }, []);

  return (
    <>
      <Router>
      <Navbar address={address} balance={balance} />
        <Switch>
        <Route
            path="/" exact
            render={(routeProps) => <Rental houses={houses} {...routeProps} />}
            />
            <Route
            path="/rental"
            render={(routeProps) => <Rental houses={houses} {...routeProps} />}
          />
          <Route path="/register" component={RegisterHouse} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
