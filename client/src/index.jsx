import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
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
      page: 1,
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
          this.setState((prevState) => {
            return { page: prevState.page + 1 };
          });
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
        page: 0,
      });
    }

    this.setState({ searchTerm: term, isLoading: true }, () => {
      axios
        .get(
          `http://localhost:3000/events?q=${term}&_page=${this.state.page}&_limit=10`
        )
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
    const { error, hasMore, events } = this.state;

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
            {events.map((item) => (
              <div className="item">
                <span className="item-date">{item.date}</span>
                <span className="item-description">{item.description}</span>
              </div>
            ))}
          </div>
          {error && <div style={{ color: "#900" }}>{error}</div>}
          {!hasMore && <div>Present-Day</div>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
