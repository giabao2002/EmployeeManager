import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class LeaveApplicationEmpForm extends Component {
  state = {};
  componentWillMount() {}
  render() {
    return (
      <div>
        <h2 id="role-form-title">Tạo đơn nghỉ phép</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onLeaveApplicationEmpSubmit}>
            <Form.Group as={Row} controlId="formType">
              <Form.Label column sm={2}>Loại</Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>Lựa chọn</option>
                  <option value="Nghỉ ốm">Nghỉ ốm</option>
                  <option value="Nghỉ phép thông thường">Nghỉ phép thông thường</option>
                  <option value="Nghỉ phép đặc quyền">Nghỉ phép đặc quyền</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formFromDate">
              <Form.Label column sm={2}>Từ ngày</Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formToDate">
              <Form.Label column sm={2}>Đến ngày</Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formReason">
              <Form.Label column sm={2}>Lý do</Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Lý do" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formStatus">
              <Form.Label column sm={2}>Trạng thái</Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1" selected>Đang xử lý</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <div className="button-group">
            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Lưu</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormClose}>Hủy</Button>
              </Col>
            </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LeaveApplicationEmpForm;
