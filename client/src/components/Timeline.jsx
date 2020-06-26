import React from "react";
import ReactDOM from "react-dom";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          {this.props.events.map((item) => (
            <div className="item">
              <span className="item-date">{item.date}</span>
              <span className="item-description">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Timeline;
