import React from "react";
import ReactDOM from "react-dom";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyEditing: "",
      newBudgetName: "",
      newBudgetAmount: "",
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleEditChange(currentlyEditing, event) {
    this.setState({
      currentlyEditing: currentlyEditing,
      [event.target.name]: event.target.value,
    });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    this.props.editBudget({
      username: this.props.currentUser,
      oldBudgetName: this.state.currentlyEditing,
      newBudgetName: this.state.newBudgetName,
      newBudgetAmount: this.state.newBudgetAmount,
    });
    this.setState({
      currentEditing: "",
      newBudgetName: "",
      newBudgetAmount: "",
    });
  }

  render() {
    return (
      <div>
        <div>Select an event: {this.props.selectedEvent.description}</div>
        <input
          className="create-budget-input"
          type="text"
          placeholder={budget.name}
          name="newBudgetName"
          value={this.state.newBudgetName}
          onChange={(event) => this.handleEditChange(budget.name, event)}
        ></input>
        <input
          className="create-budget-input"
          type="text"
          placeholder={budget.amount}
          name="newBudgetAmount"
          value={this.state.newBudgetAmount}
          onChange={(event) => this.handleEditChange(budget.name, event)}
        ></input>
        <button
          className="edit-budget-button"
          type="submit"
          onClick={(event) => this.handleEditSubmit(event)}
        >
          Edit Budget
        </button>
      </div>
    );
  }
}

export default EditForm;
