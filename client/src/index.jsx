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
      isLoading: false,
      events: [],
      page: 1,
      editMode: false,
    };

    window.onload = () => {
      var winScroll = document.querySelector("#events-feed");

      winScroll.onscroll = function () {
        updateProgressBar();
        loadMoreEvents();
      };

      function updateProgressBar() {
        var width = winScroll.scrollWidth - winScroll.clientWidth;
        var scrolled = (winScroll.scrollLeft / width) * 100;
        if (scrolled >= 100) {
          return (document.getElementById("progress-filled").style.width =
            "100%");
        }
        document.getElementById("progress-filled").style.width = scrolled + "%";
      }

      var loadMoreEvents = debounce(() => {
        const {
          getEvents,
          state: { isLoading },
        } = this;

        if (isLoading) {
          return;
        }

        if (
          winScroll.scrollLeft ===
          winScroll.scrollWidth - winScroll.clientWidth
        ) {
          this.setState((prevState) => {
            return { page: prevState.page + 1 };
          });
          getEvents(this.state.searchTerm);
        }
      }, 100);
    };

    this.getEvents = this.getEvents.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  componentWillMount() {
    this.getEvents(this.state.searchTerm);
  }

  getEvents(term) {
    if (this.state.searchTerm != term) {
      this.setState({
        events: [],
        page: 1,
      });
    }

    this.setState({ searchTerm: term, isLoading: true }, () => {
      axios
        .get(
          `http://localhost:3000/events?q=${this.state.searchTerm}&_page=${this.state.page}&_limit=10`
        )
        .then(({ data }) => {
          this.setState({
            isLoading: false,
            events: [...this.state.events, ...this.dateParser(data)],
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
          });
        });
    });
  }

  dateParser(data) {
    for (var event of data) {
      if (event.date.indexOf("/") !== -1) {
        event.date = event.date.split("/")[0];
      }
    }
    return data;
  }

  toggleEditMode(event) {
    event.preventDefault();
    if (this.state.editMode === false) {
      this.setState({
        editMode: true,
      });
    } else {
      this.setState({
        editMode: false,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <Search getEvents={this.getEvents} />
        <button type="submit" onClick={this.toggleEditMode}>
          Toggle Edit Mode
        </button>
        <Timeline events={this.state.events} editMode={this.state.editMode} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
