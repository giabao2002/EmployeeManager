import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class RewardForm extends Component {
  state = {
    employeeData: [],
  };

  loadEmployeeData = () => {
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
    this.loadEmployeeData();
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm phần thưởng</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onRewardSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="type" required>
                  <option value="1" selected>
                    Khen thưởng
                  </option>
                  <option value="2">
                    Kỷ luật
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nội dung
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Mô tả" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" placeholder="Ngày" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="employee" required>
                  <option value="" disabled selected>
                    Chọn nhân viên
                  </option>
                  {this.state.employeeData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["FirstName"]} {data["LastName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Khoản tiền
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Khoản tiền" required />
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

export default RewardForm;
