import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class RewardFormEdit extends Component {
  state = {
    employeeData: [],
    Title: this.props.editData["Title"],
    Description: this.props.editData["Description"],
    Date: this.props.editData["Date"].slice(0, 10),
    EmployeeID: this.props.editData["employee"][0]["_id"],
    Amount: this.props.editData["Amount"],
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

  onTitleChange = (e) => {
    this.setState({ Title: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ Description: e.target.value });
  };

  onDateChange = (e) => {
    this.setState({ Date: e.target.value });
  };

  onEmployeeChange = (e) => {
    this.setState({ EmployeeID: e.target.value });
  };

  onAmountChange = (e) => {
    this.setState({ Amount: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Chỉnh sửa phần thưởng</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onRewardEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="type" required>
                  <option value="1" selected>
                    Khen thưởng
                  </option>
                  <option value="2">Kỷ luật</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nội dung
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Mô tả"
                  required
                  value={this.state.Description}
                  onChange={this.onDescriptionChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Ngày"
                  required
                  value={this.state.Date}
                  onChange={this.onDateChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="employee"
                  required
                  value={this.state.EmployeeID}
                  onChange={this.onEmployeeChange}
                >
                  <option value="" disabled>
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
                Mô tả
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Mô tả"
                  required
                  value={this.state.Amount}
                  onChange={this.onAmountChange}
                />
              </Col>
            </Form.Group>
            <div className="button-group">
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
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default RewardFormEdit;
