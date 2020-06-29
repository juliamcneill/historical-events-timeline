import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentlySelected: "",
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.getCategoryList();
    this.setState({
      currentlySelected: this.props.type,
    });
  }

  getCategoryList() {
    axios
      .get(`/${this.props.type}`)
      .then(({ data }) => {
        var categories = [`${this.props.type}`];
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
    if (event.target.id === this.props.type) {
      this.props.changeCategory("", this.props.type);
    } else {
      this.props.changeCategory(event.target.id, this.props.type);
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
