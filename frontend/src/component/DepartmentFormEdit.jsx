import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class DepartmentForm extends Component {
  state = {
    DepartmentData: this.props.editData["DepartmentName"],
  };
  onChange(e) {
    this.setState({ DepartmentData: e.target.value });
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin phòng ban</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onDepartmentEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phòng ban
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên phòng ban"
                  name="DepartmentName"
                  required
                  value={this.state.DepartmentData}
                  onChange={(value) => this.onChange(value)}
                />
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

export default DepartmentForm;
