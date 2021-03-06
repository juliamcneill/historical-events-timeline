import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Edit from "./Edit.jsx";

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
      <div id="timeline-container">
        <div id="progress-container">
          <div id="progress-unfilled">
            <div id="progress-filled"></div>
          </div>
        </div>
        <div id="events-feed">
          {this.props.events.map((item) => (
            <div className="item" onClick={() => this.selectEvent(item)}>
              <span className="item-date">{item.date}</span>
              <span className="item-description">{item.description}</span>
              {item.category2 !== null ? (
                <span className="item-category">{item.category2}</span>
              ) : null}
            </div>
          ))}
        </div>
        {this.props.editMode ? (
          <Edit
            selectedEvent={this.state.selectedEvent}
            editEvent={this.props.editEvent}
          />
        ) : null}
      </div>
    );
  }
}

export default Timeline;
