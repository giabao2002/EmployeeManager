import React, { Component } from "react";
// import "./CountryForm.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

class CountryForm extends Component {
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm quốc gia</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onCountrySubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên quốc gia
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên quốc gia"
                  name="Country"
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

export default CountryForm;
