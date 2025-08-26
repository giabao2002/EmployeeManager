import React, { Component } from "react";
// import "./EducationForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class EducationForm extends Component {
  state = {};
  componentWillMount() {}
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm thông tin học vấn</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onEducationSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Trường
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Trường" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bằng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Bằng" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Loại" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Năm tốt nghiệp
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Năm tốt nghiệp"
                  required
                />
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
                <Button type="reset" onClick={this.props.onFormClose}>
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

export default EducationForm;
