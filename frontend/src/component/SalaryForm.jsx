import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class SalaryForm extends Component {
  state = {
    employeeData: [],
  };
  loadEmployeeInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ employeeData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.loadEmployeeInfo();
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm thông tin lương</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onSalarySubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Chọn nhân viên
                  </option>
                  {this.state.employeeData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["LastName"] +
                        " " +
                        data["MiddleName"] +
                        " " +
                        data["FirstName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Lương cơ bản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Lương cơ bản"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên ngân hàng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên ngân hàng"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Số tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Số tài khoản" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nhập lại số tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Nhập lại số tài khoản"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên chủ tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên chủ tài khoản"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mã SWIFT
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Mã ngân hàng" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thuế khấu trừ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Thuế khấu trừ"
                  min="0"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày nhận
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  min="1"
                  max="31"
                />
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

export default SalaryForm;
