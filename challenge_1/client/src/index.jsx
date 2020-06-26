import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Timeline from "./components/Timeline.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios
      .get(`http://localhost:3000/events?_page=1&_limit=10`)
      .then(({ data }) => {
        this.setState({
          events: data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <Timeline events={this.state.events} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
