import React, { Component } from "react";
// import "./Department.css";
import axios from "axios";
import DepartmentTable from "./DepartmentTable.jsx";
import DepartmentForm from "./DepartmentForm.jsx";
import DepartmentFormEdit from "./DepartmentFormEdit.jsx";

class Department extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <DepartmentFormEdit
              onDepartmentEditUpdate={this.handleDepartmentEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <DepartmentTable
              onAddDepartment={this.handleAddDepartment}
              onEditDepartment={this.handleEditDepartment}
            />
          )
        ) : (
          <DepartmentForm
            onDepartmentSubmit={this.handleDepartmentSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  handleDepartmentSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      DepartmentName: event.target[0].value,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/department", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleAddDepartment = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditDepartment = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleDepartmentEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    let body = {
      DepartmentName: newInfo.target[0].value,
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/department/" + info["_id"],
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Department;
