import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      lastSearched: null,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.getEvents(this.state.search);
    this.setState({
      lastSearched: this.state.search,
    });
  }

  handleClearSearch(event) {
    event.preventDefault();
    this.props.getEvents("");
    this.setState({
      search: "",
      lastSearched: null,
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search"
          name="search"
          value={this.state.search}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <button type="submit" onClick={(event) => this.handleFormSubmit(event)}>
          Search
        </button>
        <span id="searchDescription">
          {this.state.search !== "" && this.state.lastSearched !== null ? (
            <span>
              <span>Showing results for: "{this.state.lastSearched}" </span>
              <span
                id="clearSearch"
                onClick={(event) => this.handleClearSearch(event)}
              >
                x
              </span>
            </span>
          ) : null}
        </span>
      </form>
    );
  }
}

export default Search;
