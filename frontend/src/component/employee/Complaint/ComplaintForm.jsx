import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./ComplaintForm.css";

class ComplaintForm extends Component {
  state = {
    Title: "",
    Description: "",
    Date: "",
    Status: "Pending",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplaintSubmit(this.state);
  };

  render() {
    return (
      <div>
        <h2 id="role-form-title">Tạo khiếu nại</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formTitle">
              <Form.Label column sm={2}>
                Tiêu đề
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name="Title"
                  value={this.state.Title}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm={2}>
                Nội dung
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  name="Description"
                  value={this.state.Description}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDate">
              <Form.Label column sm={2}>
                Thời gian
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  name="Date"
                  value={this.state.Date}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" variant="primary">
                  Gửi
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={this.props.onFormClose}
                  className="ml-2"
                >
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

export default ComplaintForm;
