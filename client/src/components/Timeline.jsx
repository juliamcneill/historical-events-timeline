import React from "react";
import ReactDOM from "react-dom";

import EditForm from "./EditForm.jsx";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: "No event selected",
    };

    this.selectEvent = this.selectEvent.bind(this);
  }

  selectEvent(item) {
    this.setState({
      selectedEvent: item,
    });
  }

  render() {
    return (
      <div>
        <div id="progress-container">
          <div id="progress-unfilled">
            <div id="progress-filled"></div>
          </div>
        </div>
        <div id="events-feed">
          {this.props.events.map((item, index) => (
            <div className="item" onClick={() => this.selectEvent(item)}>
              <span className="item-date">{item.date}</span>
              <span className="item-description">{item.description}</span>
            </div>
          ))}
        </div>
        {this.props.editMode ? (
          <EditForm selectedEvent={this.state.selectedEvent} />
        ) : null}
      </div>
    );
  }
}

export default Timeline;
