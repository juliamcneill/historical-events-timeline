import React from "react";
import ReactDOM from "react-dom";

class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="progress-container">
            <div className="progress-bar" id="myBar"></div>
          </div>
        </div>
        <div className="container" ref={(ref) => (this.scrollRef = ref)}>
          {this.props.events.map((item, i) => (
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
