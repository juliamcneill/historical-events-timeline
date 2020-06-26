import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Search from "./components/Search.jsx";
import Timeline from "./components/Timeline.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.getEvents("");
  }

  getEvents(term) {
    axios
      .get(`http://localhost:3000/events?q=${term}&_page=1&_limit=10`)
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
        <Search getEvents={this.getEvents} />
        <Timeline events={this.state.events} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
