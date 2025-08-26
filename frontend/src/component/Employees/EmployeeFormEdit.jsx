import React, { Component } from "react";
// import "./EmployeeFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class EmployeeFormEdit extends Component {
  state = {
    roleData: [],
    Account: this.props.editData["Account"],
    departmentData: [],
    GenderData: this.props.editData["Gender"],
    EmailData: this.props.editData["Email"],
    FirstNameData: this.props.editData["FirstName"],
    MiddleNameData: this.props.editData["MiddleName"],
    LastNameData: this.props.editData["LastName"],
    DOBData: this.props.editData["DOB"].slice(0, 10),
    ContactNoData: this.props.editData["ContactNo"],
    EmployeeCodeData: this.props.editData["EmployeeCode"],
    DateOfJoiningData: this.props.editData["DateOfJoining"] ? this.props.editData["DateOfJoining"].slice(0, 10) : "",
    TerminateDateData: this.props.editData["TerminateDate"]? this.props.editData["TerminateDate"].slice(0, 10) : "",
    DepartmentSelected: this.props.editData["department"],
    RoleSelected: this.props.editData["role"],
  };
  onEmailDataChange(e) {
    this.setState({ EmailData: e.target.value });
  }
  onFirstNameDataChange(e) {
    this.setState({ FirstNameData: e.target.value });
  }
  onMiddleNameDataChange(e) {
    this.setState({ MiddleNameData: e.target.value });
  }
  onLastNameDataChange(e) {
    this.setState({ LastNameData: e.target.value });
  }
  onContactNoDataChange(e) {
    this.setState({ ContactNoData: e.target.value });
  }
  onEmployeeCodeDataChange(e) {
    this.setState({ EmployeeCodeData: e.target.value });
  }
  loadRoleInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/role", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ roleData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  loadDepartmentInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/department", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ departmentData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onGenderChange = (e) => {
    this.setState({ GenderData: e.target.value });
    this.props.onGenderChange(e);
  };
  onDOBDataChange = (e) => {
    console.log(e.target.value);
    this.setState({ DOBData: e.target.value });
  };
  onDateOfJoiningDataChange = (e) => {
    console.log(e.target.value);
    this.setState({ DateOfJoiningData: e.target.value });
  };
  onTerminateDateDataChange = (e) => {
    console.log(e.target.value);
    this.setState({ TerminateDateData: e.target.value });
  };
  onGenderChange = (e) => {
    this.setState({ GenderData: e.target.value });
    this.props.onGenderChange(e);
  };
  componentWillMount() {
    this.loadRoleInfo();
    this.loadDepartmentInfo();
  }
  render() {
    console.log("Role", this.props.editData);
    return (
      <React.Fragment>
        <h2 id="role-form-title">Chỉnh sửa thông tin người dùng</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onEmployeeEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={this.state.EmailData}
                  onChange={(value) => this.onEmailDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Quyền truy cập
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required disabled>
                  <option
                    value="1"
                    selected={this.props.editData["Account"] === 1}
                  >
                    Giám đốc
                  </option>
                  <option
                    value="2"
                    selected={this.props.editData["Account"] === 2}
                  >
                    Quản lý nhân sự
                  </option>
                  <option
                    value="3"
                    selected={this.props.editData["Account"] === 3}
                  >
                    Nhân viên
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chức vụ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="role">
                  {this.state.RoleSelected.length > 0 ? (
                    <option value={this.state.RoleSelected[0]["_id"]} selected>
                      {this.state.RoleSelected[0]["RoleName"]}
                    </option>
                  ) : (
                    <option disabled selected>
                      Chọn chức vụ
                    </option>
                  )}
                  {this.state.roleData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={() => {
                        if (this.props.editData["role"]) {
                          return (
                            this.props.editData["role"][0]["_id"] ===
                            data["_id"]
                          );
                        }
                      }}
                    >
                      {data["RoleName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Giới tính
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  type="radio"
                  label="Nam"
                  value="male"
                  name="gender"
                  onChange={this.onGenderChange}
                  checked={this.state.GenderData === "male"}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Nữ"
                  value="female"
                  name="gender"
                  onChange={this.onGenderChange}
                  checked={this.state.GenderData === "female"}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên"
                  required
                  value={this.state.FirstNameData}
                  onChange={(value) => this.onFirstNameDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên đệm
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên đệm"
                  required
                  value={this.state.MiddleNameData}
                  onChange={(value) => this.onMiddleNameDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Họ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Họ"
                  required
                  value={this.state.LastNameData}
                  onChange={(value) => this.onLastNameDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày sinh
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Ngày sinh"
                  required
                  value={this.state.DOBData}
                  onChange={(value) => this.onDOBDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thông tin liên hệ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Thông tin liên hệ "
                  required
                  value={this.state.ContactNoData}
                  onChange={(value) => this.onContactNoDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mã nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Mã nhân viên"
                  required
                  value={this.state.EmployeeCodeData}
                  onChange={(value) => this.onEmployeeCodeDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phòng ban
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department" required>
                  {this.state.DepartmentSelected.length > 0 ? (
                    <option
                      value={this.state.DepartmentSelected[0]["_id"]}
                      selected
                    >
                      {this.state.DepartmentSelected[0]["DepartmentName"]}
                    </option>
                  ) : (
                    <option value="" disabled selected>
                      Chọn phòng ban
                    </option>
                  )}
                  {this.state.departmentData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={() => {
                        if (this.props.editData["department"]) {
                          return (
                            this.props.editData["department"][0]["_id"] ===
                            data["_id"]
                          );
                        }
                      }}
                    >
                      {data["DepartmentName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày tham gia
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Ngày tham gia"
                  required
                  value={this.state.DateOfJoiningData}
                  onChange={(value) => this.onDateOfJoiningDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày kết thúc
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Ngày kết thúc"
                  value={this.state.TerminateDateData}
                  onChange={(value) => this.onTerminateDateDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Cập nhật</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormEditClose}>
                  Hủy
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeFormEdit;
