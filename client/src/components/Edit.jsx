import React from "react";
import ReactDOM from "react-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: props.selectedEvent.date,
      newDescription: props.selectedEvent.description,
      newCategory1: props.selectedEvent.category1,
      newCategory2: props.selectedEvent.category2,
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedEvent.date !== this.props.selectedEvent.date ||
      prevProps.selectedEvent.description !==
        this.props.selectedEvent.description ||
      prevProps.selectedEvent.category1 !==
        this.props.selectedEvent.category1 ||
      prevProps.selectedEvent.category2 !== this.props.selectedEvent.category2
    ) {
      this.setState({
        newDate: this.props.selectedEvent.date,
        newDescription: this.props.selectedEvent.description,
        newCategory1: this.props.selectedEvent.category1,
        newCategory2: this.props.selectedEvent.category2,
      });
    }
  }

  handleEditChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    this.props.editEvent({
      id: this.props.selectedEvent.id,
      newDate: this.state.newDate,
      newDescription: this.state.newDescription,
      newCategory1: this.state.newCategory1,
      newCategory2: this.state.newCategory2,
    });
  }

  render() {
    return (
      <div id="editForm">
        <div>Select an event:</div>
        <input
          type="text"
          name="newDate"
          value={this.state.newDate || ""}
          onChange={(event) => this.handleEditChange(event)}
        ></input>
        <input
          type="text"
          name="newDescription"
          value={this.state.newDescription || ""}
          onChange={(event) => this.handleEditChange(event)}
        ></input>
        <input
          type="text"
          name="newCategory1"
          value={this.state.newCategory1 || ""}
          onChange={(event) => this.handleEditChange(event)}
        ></input>
        <input
          type="text"
          name="newCategory2"
          value={this.state.newCategory2 || ""}
          onChange={(event) => this.handleEditChange(event)}
        ></input>
        <button type="submit" onClick={(event) => this.handleEditSubmit(event)}>
          Edit Event
        </button>
      </div>
    );
  }
}

export default Edit;
