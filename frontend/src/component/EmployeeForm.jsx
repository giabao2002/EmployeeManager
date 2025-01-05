import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class EmployeeForm extends Component {
  state = {
    roleData: [],
    positionData: [],
    departmentData: [],
    companyData: [],
  };

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
  loadPositionInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/position", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ positionData: response.data });
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
  loadCompanyInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/company", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ companyData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentWillMount() {
    this.loadRoleInfo();
    this.loadPositionInfo();
    this.loadDepartmentInfo();
    this.loadCompanyInfo();
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm người dùng</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onEmployeeSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@gmail\.(com|org|net|edu)"
                  title="Email phải có đuôi @gmail.com"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mật khẩu
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="password" placeholder="Mật khẩu" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Quyền truy cập
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Quản trị</option>
                  <option value="2">Quản trị nhân sự</option>
                  <option value="3">Nhân viên</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chức vụ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="role" required>
                  <option disabled selected>
                    Chọn chức vụ
                  </option>
                  {this.state.roleData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={data["RoleName"] === "Nhân viên"}
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
                  onChange={this.props.onGenderChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Nữ"
                  value="female"
                  name="gender"
                  onChange={this.props.onGenderChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Tên" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên đệm
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Tên đệm" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Họ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Họ" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày sinh
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" placeholder="Ngày sinh" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thông tin liên hệ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Thông tin liên hệ"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mã nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Mã nhân viên" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phòng ban
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department" required>
                  <option value="" disabled selected>
                    Chọn phòng ban
                  </option>
                  {this.state.departmentData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
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
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày kết thúc
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" placeholder="Ngày kết thúc" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Lưu</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormClose}>
                  Hủy
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default EmployeeForm;
