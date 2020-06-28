import React from "react";
import ReactDOM from "react-dom";

class EditForm extends React.Component {
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
    this.setState({
      newDate: "",
      newDescription: "",
    });
  }

  render() {
    return (
      <div>
        <div>Select an event: {this.props.selectedEvent.id}</div>
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

export default EditForm;
