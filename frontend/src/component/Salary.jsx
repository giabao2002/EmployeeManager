import React, { Component } from "react";
// import "./Salary.css";
import axios from "axios";
import SalaryTable from "./SalaryTable.jsx";
import SalaryForm from "./SalaryForm.jsx";
import SalaryFormEdit from "./SalaryFormEdit.jsx";
import Swal from "sweetalert2";
class Salary extends Component {
  state = {
    table: true,
    editForm: false,
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <SalaryFormEdit
              onSalaryEditUpdate={this.handleSalaryEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              onGenderChange={this.handleEditFormGenderChange}
            />
          ) : (
            <SalaryTable
              onAddSalary={this.handleAddSalary}
              onEditSalary={this.handleEditSalary}
            />
          )
        ) : (
          <SalaryForm
            onSalarySubmit={this.handleSalarySubmit}
            onFormClose={this.handleFormClose}
            onGenderChange={this.handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  }
  handleSalarySubmit = (event) => {
    event.preventDefault();
    const trimmedValues = Array.from(event.target).map(input => input.value.trim()).slice(0, -2);

    console.log(trimmedValues);

    if (trimmedValues.some(value => value === "")) {
      Swal.fire({
      title: "Thông báo",
      text: "Không được để trống bất kỳ thông tin nào",
      icon: "warning",
      confirmButtonText: "OK",
      });
      return;
    }

    if (!(trimmedValues[3] === trimmedValues[4])) {
      Swal.fire({
        title: "Thông báo",
        text: "Số tài khoản ngân hàng bạn nhập không khớp",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      console.log("id", trimmedValues[0], trimmedValues[1]);
      this.setState({ table: true });

      if(trimmedValues[7] < 0 || trimmedValues[7] > 35) {
        Swal.fire({
          title: "Thông báo",
          text: "Thuế phải nằm trong khoảng từ 0 đến 35",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }

      let body = {
        BasicSalary: trimmedValues[1],
        BankName: trimmedValues[2],
        AccountNo: trimmedValues[3],
        AccountHolderName: trimmedValues[5],
        IFSCcode: trimmedValues[6],
        TaxDeduction: trimmedValues[7],
        ReceivingDate: trimmedValues[8],
      };
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "/api/salary/" +
            event.target[0].value,
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
          Swal.fire({
            title: "Thông báo",
            text: "Thêm thông tin lương thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status === 403) {
            Swal.fire({
              title: err.response.data,
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        });
    }
  };
  handleAddSalary = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditSalary = (e) => {
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

  handleSalaryEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const trimmedValues = Array.from(newInfo.target).map(input => input.value.trim()).slice(0, -2);

    if (trimmedValues.some(value => value === "")) {
      Swal.fire({
        title: "Thông báo",
        text: "Không được để trống bất kỳ thông tin nào",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!(trimmedValues[3] === trimmedValues[4])) {
      Swal.fire({
        title: "Thông báo",
        text: "Số tài khoản ngân hàng bạn nhập không khớp",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      let body = {
        BasicSalary: trimmedValues[1],
        BankName: trimmedValues[2],
        AccountNo: trimmedValues[3],
        AccountHolderName: trimmedValues[5],
        IFSCcode: trimmedValues[6],
        TaxDeduction: trimmedValues[7],
        ReceivingDate: trimmedValues[8],
      };
      console.log("update", body);
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "/api/salary/" +
            info["salary"][0]["_id"],
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
    }
  };
}

export default Salary;
