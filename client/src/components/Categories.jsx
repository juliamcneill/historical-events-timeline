import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentlySelected: "Topics",
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList() {
    axios
      .get(`/topics`)
      .then(({ data }) => {
        var categories = ["Topics"];
        data.forEach(function (event) {
          if (event.category2 !== null) {
            categories.push(event.category2);
          }
        });
        this.setState({
          categories: categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectCategory(event) {
    this.setState({
      currentlySelected: event.target.id,
    });
    if (event.target.id === "Topics") {
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
