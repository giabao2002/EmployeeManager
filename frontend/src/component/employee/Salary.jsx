import React, { Component } from "react";
import SalaryTable from "./SalaryTable.jsx";
class Salary extends Component {
  state = {
    table: true,
    editForm: false,
  };

  render() {
    return (
      <React.Fragment>
        <SalaryTable
          onAddSalary={this.handleAddSalary}
          onEditSalary={this.handleEditSalary}
          data={this.props.data}
        />
      </React.Fragment>
    );
  }
}

export default Salary;
