import React, { Component } from "react";
// import "./WorkExperienceForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class WorkExperienceForm extends Component {
  state = {};
  componentWillMount() {}
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm kinh nghiệm làm việc</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onWorkExperienceSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên công ty
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Tên công ty" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chức vụ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Chức vụ" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Từ ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Đến ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" required />
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

export default WorkExperienceForm;
