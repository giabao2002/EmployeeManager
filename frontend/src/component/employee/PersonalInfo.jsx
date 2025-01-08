import React, { Component } from "react";
// import "./PersonalInfo.css";
import axios from "axios";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";
class PersonalInfo extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormGender: "",
    employeeCode: "",
    editFormGender: "",
    salaryInfo: {},
    code: "",
  };

  render() {
    console.log("salaryInfo", this.state.salaryInfo);
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <PersonalInfoFormEdit
              onPersonalInfoEditUpdate={this.handlePersonalInfoEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              onGenderChange={this.handleEditFormGenderChange}
            />
          ) : (
            <>
              <PersonalInfoTable
                onAddPersonalInfo={this.handleAddPersonalInfo}
                onEditPersonalInfo={this.handleEditPersonalInfo}
                data={this.props.data}
                back={this.props.back}
              />
              <div>
                <h2 id="role-title">Thông tin lương</h2>
                <div id="clear-both" />
                <div>
                  <table id="table-div">
                    <tbody>
                      <tr>
                        <td>Mã nhân viên:</td>
                        <td>{this.state.code}</td>
                      </tr>
                      <tr>
                        <td>Số tài khoản:</td>
                        <td>{this.state.salaryInfo && this.state.salaryInfo.AccountNo ? this.state.salaryInfo.AccountNo : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Tên tài khoản:</td>
                        <td>{this.state.salaryInfo && this.state.salaryInfo.AccountHolderName ? this.state.salaryInfo.AccountHolderName : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Ngân hàng:</td>
                        <td>{this.state.salaryInfo && this.state.salaryInfo.BankName ? this.state.salaryInfo.BankName : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Lương cơ bản:</td>
                        <td>{this.state.salaryInfo && this.state.salaryInfo.BasicSalary ? `${this.state.salaryInfo.BasicSalary} VND` : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Thuế khẩu trừ:</td>
                        <td>{this.state.salaryInfo && this.state.salaryInfo.TaxDeduction ? `${this.state.salaryInfo.TaxDeduction} VND` : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Lương tổng kết:</td>
                        <td>
                          {this.state.salaryInfo && this.state.salaryInfo.BasicSalary && this.state.salaryInfo.TaxDeduction
                            ? `${this.state.salaryInfo.BasicSalary - this.state.salaryInfo.TaxDeduction} VND`
                            : 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
  handleEditPersonalInfo = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handlePersonalInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);

    const formData = new FormData();
    formData.append("Gender", this.state.editFormGender);
    formData.append("ContactNo", newInfo.target[5].value);
    formData.append("EmergencyContactNo", newInfo.target[6].value);
    formData.append("Email", newInfo.target[7].value);
    formData.append("PANcardNo", newInfo.target[8].value);
    formData.append("DOB", newInfo.target[9].value);
    formData.append("BloodGroup", newInfo.target[10].value);
    formData.append("Hobbies", newInfo.target[11].value);
    formData.append("PresentAddress", newInfo.target[12].value);
    formData.append("PermanetAddress", newInfo.target[13].value);

    // Assuming the file input is at index 14
    if (newInfo.target[14].files[0]) {
      formData.append("Photo", newInfo.target[14].files[0]);
    }

    console.log("update", formData);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/personal-info/" + info["_id"],
        formData,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // Save the new photo filename to localStorage
        if (res.data.Photo) {
          localStorage.setItem("Photo", res.data.Photo);
        }
        this.setState({ table: false });
        this.setState({ table: true });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
  handleEditFormGenderChange = (e) => {
    this.setState({
      editFormGender: e.currentTarget.value,
    });
  };

  loadEmployeeCode = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/personal-info/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        console.log('Response', response.data);
        this.setState({ employeeCode: response.data["_id"] });
        this.setState({ code: response.data["EmployeeCode"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadSalaryInfoData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/employee-salary/${this.state.employeeCode}`,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.setState({ salaryInfo: response.data["salary"][0] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadEmployeeCode();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.employeeCode !== this.state.employeeCode) {
      this.loadSalaryInfoData();
    }
  }
}

export default PersonalInfo;
