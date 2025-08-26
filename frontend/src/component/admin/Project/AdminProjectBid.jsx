import React, { Component } from "react";
// import "./AdminProjectBid.css";
import axios from "axios";
import AdminProjectBidTable from "./AdminProjectBidTable.jsx";
import AdminProjectBidForm from "./AdminProjectBidForm.jsx";
import AdminProjectBidFormEdit from "./AdminProjectBidFormEdit.jsx";
import Swal from "sweetalert2";

class AdminProjectBid extends Component {
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
            <AdminProjectBidFormEdit
              onProjectBidEditUpdate={this.handleProjectBidEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <AdminProjectBidTable
              onAddProjectBid={this.handleAddProjectBid}
              onEditProjectBid={this.handleEditProjectBid}
            />
          )
        ) : (
          <AdminProjectBidForm
            onProjectBidSubmit={this.handleProjectBidSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }

  handleProjectBidSubmit = (event) => {
    event.preventDefault();
    const body = this.getFormData(event);
    if (!body) return;

    this.setState({ table: true });
    axios
      .post(process.env.REACT_APP_API_URL + "/api/admin/project-bid", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
        Swal.fire({
          title: "Thành công",
          text: "Khởi tạo dự án thành công!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddProjectBid = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };

  handleEditProjectBid = (e) => {
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

  handleProjectBidEditUpdate = (info, editInfo) => {
    const body = this.getFormData(editInfo);
    if (!body) return;

    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/admin/project-bid/" + info["_id"],
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

  getFormData = (event) => {
    const body = {
      ProjectTitle: event.target[0].value.trim(),
      ProjectURL: event.target[1].value.trim(),
      ProjectDesc: event.target[2].value.trim(),
      EstimatedTime: event.target[3].value.trim(),
      EstimatedCost: event.target[4].value.trim(),
      ResourceID: event.target[5].value.trim(),
      Status: event.target[6].value.trim(),
      Remark: event.target[7].value.trim(),
    };

    for (let key in body) {
      if (body[key] === "") {
        Swal.fire({
          title: "Error",
          text: `Không được để trống giá trị!`,
          icon: "error",
          confirmButtonText: "Ok",
        });
        return null;
      }
    }
    return body;
  };
}

export default AdminProjectBid;
