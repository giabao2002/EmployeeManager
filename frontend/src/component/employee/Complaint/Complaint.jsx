import React, { Component } from "react";
import axios from "axios";
import ComplaintTable from "./ComplaintTable.jsx";
import ComplaintForm from "./ComplaintForm.jsx";
import Swal from "sweetalert2";

class Complaint extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    data: [],
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          <ComplaintTable
            onAddComplaint={this.handleAddComplaint}
            onEditComplaint={this.handleEditComplaint}
            data={this.state.data}
            prevData={this.props.data}
          />
        ) : (
          <ComplaintForm
            onComplaintSubmit={this.handleComplaintSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }

  loadComplaintData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/employee-complaint/${this.props.data["_id"]}`,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadComplaintData();
  }

  handleComplaintSubmit = (complaint) => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          `/api/complaint/${this.props.data["_id"]}`,
        {
          ...complaint,
          employee: this.props.data["_id"],
        },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        this.setState({ table: true });
        this.loadComplaintData();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Đã có lỗi xảy ra",
        });
      });
  };

  handleAddComplaint = () => {
    this.setState({ table: false });
  };


  handleFormClose = () => {
    this.setState({ table: true });
  };
}

export default Complaint;
