import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class RoleForm extends Component {
  state = {
    RoleData: this.props.editData["RoleName"],
  };
  onChange(e) {
    this.setState({ RoleData: e.target.value });
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin chức vụ</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onRoleEditUpdate(
                this.props.editData,
                e.target[0].value
              )
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chức vụ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Chức vụ"
                  name="RoleName"
                  required
                  value={this.state.RoleData}
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

export default RoleForm;
