import React from "react";
import ReactDOM from "react-dom";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Filter", "Art", "Literature", "Education"],
      currentlySelected: "Filter",
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(event) {
    this.setState({
      currentlySelected: event.target.id,
    });
    if (event.target.id === "Filter") {
      this.props.changeCategory("");
    } else {
      this.props.changeCategory(event.target.id);
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button type="button" className="dropbtn">
          {this.state.currentlySelected}
        </button>
        <div className="dropdown-content">
          {this.state.categories.map((item) =>
            item != this.state.currentlySelected ? (
              <a id={item} onClick={(event) => this.selectCategory(event)}>
                {item}
              </a>
            ) : null
          )}
        </div>
      </div>
    );
  }
}

export default Categories;
