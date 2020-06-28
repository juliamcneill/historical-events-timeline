import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
      search: "",
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
      </form>
    );
  }
}

export default Search;
