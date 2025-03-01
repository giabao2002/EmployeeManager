import React, { Component } from "react";
// import "./FamilyInfoForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class FamilyInfoForm extends Component {
  state = {};
  componentWillMount() {}
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm thông tin gia đình</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onFamilyInfoSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Tên người thân" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mối quan hệ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Mối quan hệ" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày sinh
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nghề nghiệp
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Nghề nghiệp" required />
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

export default FamilyInfoForm;
