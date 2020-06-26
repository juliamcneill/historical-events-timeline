import React from "react";
import ReactDOM from "react-dom";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Select an event: {this.props.selectedEvent.description}</div>;
  }
}

export default EditForm;
