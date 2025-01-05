import React, { Component } from "react";
// import "./AdminPortalForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";

class AdminPortalForm extends Component {
  state = {
    status: "",
  };
  handleChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm chi tiết cổng thông tin</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onPortalSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Cổng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên cổng"
                  name="Portal"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Trạng thái
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  type="radio"
                  label="Cho phép"
                  value="1"
                  name="status"
                  onChange={this.props.onStatusChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Chặn"
                  value="0"
                  name="status"
                  onChange={this.props.onStatusChange}
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

export default AdminPortalForm;