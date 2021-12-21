import { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from '../abis/TodoList.json';
//import "bootstrap/dist/css/bootstrap.css";

function App(props) {
  const [account, setAccount] = useState();
  const [todoListContract, setTodoListContract] = useState('');
  useEffect(() => {
    const ethEnable = async () => {
      loadBlockchainData();
    };
    ethEnable();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);

      // connect to metamask
      let web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else if (!window.web3) {
      window.alert("MetaMask is not detected");
    }
  };

  return (
    <div>
      <p>{account}</p>
    </div>
  );
}

export default App;
