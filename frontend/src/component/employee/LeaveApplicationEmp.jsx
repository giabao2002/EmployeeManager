import React, { Component } from "react";
// import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit.jsx";
import Swal from "sweetalert2";
class LeaveApplicationEmp extends Component {
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
          this.state.editForm ? (
            <LeaveApplicationEmpFormEdit
              onLeaveApplicationEmpEditUpdate={
                this.handleLeaveApplicationEmpEditUpdate
              }
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <LeaveApplicationEmpTable
              onAddLeaveApplicationEmp={this.handleAddLeaveApplicationEmp}
              onEditLeaveApplicationEmp={this.handleEditLeaveApplicationEmp}
              data={this.props.data}
            />
          )
        ) : (
          <LeaveApplicationEmpForm
            onLeaveApplicationEmpSubmit={this.handleLeaveApplicationEmpSubmit}
            onFormClose={this.handleFormClose}
            onGenderChange={this.handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  }
  loadLeaveApplicationEmpData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/leave-application-emp/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.leaveApplicationEmpObj = response.data;
        console.log("data", response.data["leaveApplication"]);
        this.setState({ data: response.data["leaveApplication"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadLeaveApplicationEmpData();
  }
  handleLeaveApplicationEmpSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for accurate date comparison

    const FromDate = new Date(event.target[1].value);
    const ToDate = new Date(event.target[2].value);

    // Reset time to 00:00:00 for accurate date comparison
    FromDate.setHours(0, 0, 0, 0);

    if (FromDate < today) {
      Swal.fire({
        icon: "error",
        title: "Ngày bắt đầu không thể là ngày trong quá khứ",
        text: "Ngày bắt đầu phải là ngày hiện tại hoặc tương lai",
      });
      return;
    }

    if (FromDate > ToDate) {
      Swal.fire({
        icon: "error",
        title: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
      return;
    }
    const leaveApplicationsThisMonth = this.state.data.filter((leave) => {
      const leaveFromDate = new Date(leave.FromDate);
      const leaveToDate = new Date(leave.ToDate);
      const leaveMonth = leaveFromDate.getMonth();
      const leaveYear = leaveFromDate.getFullYear();
      const requestedMonth = FromDate.getMonth();
      const requestedYear = FromDate.getFullYear();

      return (
        (leaveMonth === requestedMonth && leaveYear === requestedYear) ||
        (leaveToDate.getMonth() === requestedMonth && leaveToDate.getFullYear() === requestedYear)
      );
    });

    // console.log("Leave applications this month", leaveApplicationsThisMonth);

    if (leaveApplicationsThisMonth.length >= 2) {
      Swal.fire({
        icon: "error",
        title: "Bạn đã xin nghỉ đủ số buổi trong tháng",
      });
      return;
    } else {
      console.log("Leave applications this month", leaveApplicationsThisMonth);
      let body = {
        Leavetype: event.target[0].value,
        FromDate: event.target[1].value,
        ToDate: event.target[2].value,
        Reasonforleave: event.target[3].value,
        Status: event.target[4].value,
      };
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "/api/leave-application-emp/" +
            this.props.data["_id"],
          body,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        )
        .then((res) => {
          this.setState({ table: true });
        })
        .catch((err) => {
          this.setState({ table: true });
          Swal.fire({
            icon: "error",
            title: "Đã có lỗi xảy ra",
          });
        });
    }
    window.location.reload();
  };
  handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditLeaveApplicationEmp = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Reasonforleave: newInfo.target[3].value,
      Status: newInfo.target[4].value,
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/api/leave-application-emp/" +
          info["_id"],
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

export default LeaveApplicationEmp;
