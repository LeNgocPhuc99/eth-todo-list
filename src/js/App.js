import { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "../abis/TodoList.json";
//import "bootstrap/dist/css/bootstrap.css";

function App(props) {
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState({ id: "0" });
  const [todoListContract, setTodoListContract] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [appStatus, setAppStatus] = useState(true);

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
      // load users network ID and name
      const networkId = await web3.eth.net.getId();
      setNetwork({ ...network, id: networkId });

      const todoListData = TodoList.networks[networkId];
      if (todoListData) {
        // load TodoList Contract
        let web3 = window.web3;
        const todoListContract = new web3.eth.Contract(
          TodoList.abi,
          todoListData.address
        );
        setTodoListContract(todoListContract);

        const taskCount = await todoListContract.methods.taskCount().call();
        setTaskCount(taskCount);
        // load tasks list
        for (let i = 1; i <= taskCount; i++) {
          const task = await todoListContract.methods.tasks(i).call();
          setTasks(...tasks, task);
        }
      } else {
        setAppStatus(false);
        window.alert(
          "TodoList contract is not deployed on this network, please change testnet !!!"
        );
      }
    } else if (!window.web3) {
      window.alert("MetaMask is not detected");
    }
  };

  return (
    <div>
      <p>{account}</p>
      <p>{taskCount}</p>
    </div>
  );
}

export default App;
