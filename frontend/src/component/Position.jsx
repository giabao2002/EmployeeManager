import React, { Component } from "react";
// import "./Position.css";
import axios from "axios";
import PositionTable from "./PositionTable.jsx";
import PositionForm from "./PositionForm.jsx";
import PositionFormEdit from "./PositionFormEdit.jsx";

class Position extends Component {
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
            <PositionFormEdit
              onPositionEditUpdate={this.handlePositionEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <PositionTable
              onAddPosition={this.handleAddPosition}
              onEditPosition={this.handleEditPosition}
            />
          )
        ) : (
          <PositionForm
            onPositionSubmit={this.handlePositionSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  handlePositionSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      CompanyID: event.target[0].value,
      PositionName: event.target[1].value,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/position", body, {
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
  handleAddPosition = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditPosition = (e) => {
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
  handlePositionEditUpdate = (info, formData1, formData2) => {
    let body = {
      CompanyID: formData1,
      PositionName: formData2,
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/position/" + info["_id"],
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

export default Position;
