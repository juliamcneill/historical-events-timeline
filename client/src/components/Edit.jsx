import React from "react";
import ReactDOM from "react-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: props.selectedEvent.date,
      newDescription: props.selectedEvent.description,
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedEvent.date !== this.props.selectedEvent.date ||
      prevProps.selectedEvent.description !==
        this.props.selectedEvent.description
    ) {
      this.setState({
        newDate: this.props.selectedEvent.date,
        newDescription: this.props.selectedEvent.description,
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
          onChange={this.handleEditChange}
        ></input>
        <button type="submit" onClick={this.handleEditSubmit}>
          Edit Event
        </button>
      </div>
    );
  }
}

export default Edit;
