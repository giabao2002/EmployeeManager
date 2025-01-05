import React, { Component } from "react";
// import "./Role.css";
import axios from "axios";
import RoleTable from "./RoleTable.jsx";
import RoleForm from "./RoleForm.jsx";
import RoleFormEdit from "./RoleFormEdit.jsx";

class Role extends Component {
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
            <RoleFormEdit
              onRoleEditUpdate={this.handleRoleEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <RoleTable
              onAddRole={this.handleAddRole}
              onEditRole={this.handleEditRole}
            />
          )
        ) : (
          <RoleForm
            onRoleSubmit={this.handleRoleSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  handleRoleSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      RoleName: event.target[0].value,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/role", body, {
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
  handleAddRole = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditRole = (e) => {
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
  handleRoleEditUpdate = (info, formData1) => {
    let body = {
      RoleName: formData1,
    };
    console.log("update", body);
    axios
      .put(process.env.REACT_APP_API_URL + "/api/role/" + info["_id"], body, {
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

    this.setState({ editForm: false });
  };
}

export default Role;
