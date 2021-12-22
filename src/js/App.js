import { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "../abis/TodoList.json";
import TaskList from "./components/TaskList";
import "../css/App.css";


function App(props) {
  const [account, setAccount] = useState();
  const [todoListContract, setTodoListContract] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [appLoading, setAppLoading] = useState(true);

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
          setTasks(tasks => [...tasks, task]);
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
    setAppLoading(false);
  };

  const createTask = (_content) => {
    setAppLoading(true);
    todoListContract.methods
      .createTask(_content)
      .send({ from: account })
      .on("receipt", (receipt) => {
        setAppLoading(false);
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            {appLoading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} createTask={createTask} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
