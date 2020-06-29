import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import debounce from "lodash.debounce";

import Search from "./components/Search.jsx";
import Categories from "./components/Categories.jsx";
import Timeline from "./components/Timeline.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      category: "Filter",
      isLoading: false,
      events: [],
      eventsLoaded: 0,
      eventsIncrement: 20,
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
            return {
              eventsLoaded: prevState.eventsLoaded + this.state.eventsIncrement,
            };
          });
          getEvents(this.state.searchTerm);
        }
      }, 100);
    };

    this.getEvents = this.getEvents.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentWillMount() {
    this.getEvents(this.state.searchTerm, this.state.category);
  }

  getEvents(searchTerm, category, eventEdited) {
    if (
      this.state.searchTerm != searchTerm ||
      this.state.category != category ||
      eventEdited === true
    ) {
      this.setState({
        events: [],
        eventsLoaded: 0,
      });
    }

    this.setState(
      { searchTerm: searchTerm, category: category, isLoading: true },
      () => {
        axios
          .get(
            `/events?searchTerm=${this.state.searchTerm}&category=${this.state.category}&eventsLoaded=${this.state.eventsLoaded}&eventsIncrement=${this.state.eventsIncrement}`
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
      }
    );
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

  editEvent(newEventInformation) {
    axios
      .put(`/events`, newEventInformation)
      .then(() =>
        this.getEvents(this.state.searchTerm, this.state.category, true)
      )
      .catch((error) => {
        console.log(error);
      });
  }

  changeSearch(searchTerm) {
    this.getEvents(searchTerm, this.state.category);
  }

  clearSearch() {
    console.log("being cleared");
    this.getEvents("", this.state.category);
  }

  changeCategory(category) {
    this.getEvents(this.state.searchTerm, category);
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <Search
          changeSearch={this.changeSearch}
          clearSearch={this.clearSearch}
        />
        <Categories changeCategory={this.changeCategory} />
        <Timeline
          events={this.state.events}
          editMode={this.state.editMode}
          editEvent={this.editEvent}
        />
        {this.state.editMode === false ? (
          <button type="submit" onClick={this.toggleEditMode}>
            Edit Mode
          </button>
        ) : (
          <button type="submit" onClick={this.toggleEditMode}>
            Back to View Mode
          </button>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
