import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3('http://localhost:8545');
    this.web3.eth.getAccounts(console.log);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Ethereum Todo List</h1>
          <br />
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
