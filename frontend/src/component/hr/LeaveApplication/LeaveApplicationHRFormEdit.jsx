import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class LeaveApplicationHRForm extends Component {
  state = {
    FromDateData: this.props.editData["FromDate"].slice(0, 10),
    ToDateData: this.props.editData["ToDate"].slice(0, 10),
    ReasonforleaveData: this.props.editData["Reasonforleave"],
    nameData:
      this.props.editData["employee"][0]["FirstName"] +
      " " +
      this.props.editData["employee"][0]["LastName"],
  };

  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">
          Chỉnh sửa thông tin nghỉ phép của {this.state.nameData}
        </h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onLeaveApplicationHREditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại nghỉ phép
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Lựa chọn
                  </option>
                  <option
                    value="Nghỉ ốm"
                    selected={this.props.editData["Leavetype"] === "Nghỉ ốm"}
                    disabled
                  >
                    Nghỉ ốm
                  </option>
                  <option
                    value="Nghỉ phép thông thường"
                    selected={
                      this.props.editData["Leavetype"] ===
                      "Nghỉ phép thông thường"
                    }
                    disabled
                  >
                    Nghỉ phép thông thường
                  </option>
                  <option
                    value="Nghỉ phép đặc quyền"
                    selected={
                      this.props.editData["Leavetype"] === "Nghỉ phép đặc quyền"
                    }
                    disabled
                  >
                    Nghỉ phép đặc quyền
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Từ ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  disabled
                  value={this.state.FromDateData}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tới ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  disabled
                  value={this.state.ToDateData}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Lý do
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Lý do"
                  required
                  disabled
                  value={this.state.ReasonforleaveData}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Trạng thái
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1" selected disabled>
                    Chờ xử lý
                  </option>
                  <option
                    value="2"
                    selected={this.props.editData["Status"] === 2}
                  >
                    Cho phép
                  </option>
                  <option
                    value="3"
                    selected={this.props.editData["Status"] === 3}
                  >
                    Từ chối
                  </option>
                </Form.Control>
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
      </div>
    );
  }
}

export default LeaveApplicationHRForm;
