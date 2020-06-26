import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import request from "superagent";
import debounce from "lodash.debounce";

import Search from "./components/Search.jsx";
import Timeline from "./components/Timeline.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      hasMore: true,
      isLoading: false,
      events: [],
    };

    window.onload = () => {
      var winScroll = document.querySelector(".container");

      winScroll.onscroll = function () {
        updateProgressBar();
        loadMoreEvents();
      };

      function updateProgressBar() {
        var width = winScroll.scrollWidth - winScroll.clientWidth;
        var scrolled = (winScroll.scrollLeft / width) * 100;
        if (scrolled >= 100) {
          return (document.getElementById("myBar").style.width = "100%");
        }
        document.getElementById("myBar").style.width = scrolled + "%";
      }

      var loadMoreEvents = debounce(() => {
        const {
          getEvents,
          state: { error, isLoading, hasMore },
        } = this;

        if (error || isLoading || !hasMore) {
          return;
        }

        var winScroll = document.querySelector(".container");

        if (
          winScroll.scrollLeft ===
          winScroll.scrollWidth - winScroll.clientWidth
        ) {
          getEvents(this.state.searchTerm);
        }
      }, 50);
    };

    this.getEvents = this.getEvents.bind(this);
  }

  componentWillMount() {
    this.getEvents(this.state.searchTerm);
  }

  getEvents(term) {
    if (this.state.searchTerm != term) {
      this.setState({
        events: [],
      });
    }

    this.setState({ searchTerm: term, isLoading: true }, () => {
      axios
        .get(`http://localhost:3000/events?q=${term}&_page=1&_limit=10`)
        .then(({ data }) => {
          this.setState({
            hasMore: this.state.events.length < 10000,
            isLoading: false,
            events: [...this.state.events, ...data],
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: error.message,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const { error, hasMore, isLoading, events } = this.state;

    return (
      <div>
        <h1>Historical Events Finder</h1>
        <Search getEvents={this.getEvents} />
        <div>
          <div className="header">
            <div className="progress-container">
              <div className="progress-bar" id="myBar"></div>
            </div>
          </div>
          <div className="container" ref={(ref) => (this.scrollRef = ref)}>
            {this.state.events.map((item, i) => (
              <div className="item">
                <span className="item-date">{item.date}</span>
                <span className="item-description">{item.description}</span>
              </div>
            ))}
          </div>
          {error && <div style={{ color: "#900" }}>{error}</div>}
          {isLoading && <div>Loading...</div>}
          {!hasMore && <div>You did it! You reached the end!</div>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
