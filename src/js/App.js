import { useState, useEffect } from "react";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.css";

function App(props) {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();

  const connectWeb3 = async (e) => {
    if (e) {
      e.preventDefault();
    }

    var web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("web3 connected....");
      } catch (error) {
        console.log(error);
      }
    } else if (window.web3) {
      // use MetaMask's provide
      web3 = window.web3;
      console.log("Injected web3 detected....");
    }

    return web3;
  };

  const connectWallet = async (e) => {
    const web3 = await connectWeb3(e);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    console.log(web3);
    console.log(accounts[0]);
  };

  useEffect(() => {
    if (window.ethereum.isConnected()) {
      connectWallet();
    }
  }, []);

  return <div></div>;
}

export default App;
