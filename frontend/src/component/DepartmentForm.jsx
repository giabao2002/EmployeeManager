import React, { Component } from "react";
// import "./DepartmentForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class DepartmentForm extends Component {
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm phòng ban</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onDepartmentSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phòng ban
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên phòng ban"
                  name="Department"
                  required
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

export default DepartmentForm;
