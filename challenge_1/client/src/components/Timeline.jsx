import React from "react";

class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevState.scrollLeftPosition);
    const scrollContainer = ReactDOM.findDOMNode(this.scrollRef);
    if (scrollContainer) {
      scrollContainer.scrollLeft += this.state.scrollLeftPosition;
    }
  }

  centerActiveItem() {
    const scrollContainer = ReactDOM.findDOMNode(this.scrollRef);
    const activeItem = ReactDOM.findDOMNode(this.activeRef);

    if (!activeItem) {
      return;
    }

    const scrollRect = scrollContainer.getBoundingClientRect();
    const activeRect = activeItem.getBoundingClientRect();
    const activeWidth = activeRect.width;
    const activeLeft = activeRect.left;
    const activeRight = activeRect.right;
    const scrollWidth = scrollContainer.scrollWidth;
    const scrollLeft = scrollRect.left;

    this.setState((state) => {
      return {
        ...state,
        scrollLeftPosition:
          activeRect.left -
          scrollRect.left -
          scrollRect.width / 2 +
          activeRect.width / 2,
      };
    });
  }

  toggleItem(currentItem) {
    this.setState(
      (state) => {
        return {
          ...state,
          items: state.items.map((item) => {
            item.active =
              currentItem.id === item.id ? (item.active = !item.active) : false;

            return {
              ...item,
            };
          }),
        };
      },
      () => {
        this.centerActiveItem();
      }
    );
  }

  clickHandler(event, currentItem) {
    this.toggleItem(currentItem);
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
            <div
              ref={(ref) => {
                if (item.active) {
                  this.activeRef = ref;
                }
              }}
              className={`item ${item.active ? "active" : ""}`}
              key={i}
              onClick={(e) => this.clickHandler(e, item)}
            >
              <span>
                {item.description} Date: {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Timeline;
