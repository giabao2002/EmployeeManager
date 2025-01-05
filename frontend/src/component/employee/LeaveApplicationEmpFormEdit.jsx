import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class LeaveApplicationEmpForm extends Component {
  state = {
    FromDateData: this.props.editData["FromDate"].slice(0, 10),
    ToDateData: this.props.editData["ToDate"].slice(0, 10),
    ReasonforleaveData: this.props.editData["Reasonforleave"],
  };
  onFromDateDataChange(e) {
    this.setState({ FromDateData: e.target.value });
  }
  onToDateDataChange(e) {
    this.setState({ ToDateData: e.target.value });
  }
  onReasonforleaveDataChange(e) {
    this.setState({ ReasonforleaveData: e.target.value });
  }
  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin nghỉ phép</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onLeaveApplicationEmpEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Lựa chọn
                  </option>
                  <option
                    value="Nghỉ ốm"
                    selected={this.props.editData["Leavetype"] === "Nghỉ ốm"}
                  >
                    Nghỉ ốm
                  </option>
                  <option
                    value="Nghỉ thông thường"
                    selected={
                      this.props.editData["Leavetype"] === "Nghỉ thông thường"
                    }
                  >
                    Nghỉ thông thường
                  </option>
                  <option
                    value="Nghỉ đặc quyền"
                    selected={
                      this.props.editData["Leavetype"] === "Nghỉ đặc quyền"
                    }
                  >
                    Nghỉ đặc quyền
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
                  value={this.state.FromDateData}
                  onChange={(value) => this.onFromDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Đến ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  value={this.state.ToDateData}
                  onChange={(value) => this.onToDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Lí do
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Reason for leave"
                  required
                  value={this.state.ReasonforleaveData}
                  onChange={(value) => this.onReasonforleaveDataChange(value)}
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
                    Đang xử lý
                  </option>
                </Form.Control>
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
      </div>
    );
  }
}

export default LeaveApplicationEmpForm;
