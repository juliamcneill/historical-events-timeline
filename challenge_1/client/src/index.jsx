import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1>Historical Events Finder</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
