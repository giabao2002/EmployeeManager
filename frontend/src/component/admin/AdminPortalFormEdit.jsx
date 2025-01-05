import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class AdminPortalForm extends Component {
  state = {
    PortalData: this.props.editData["PortalName"],
    Status: this.props.editData["Status"],
  };
  onChange(e) {
    this.setState({ PortalData: e.target.value });
  }
  onStatusChange = (e) => {
    this.setState({ Status: e.target.value });
    this.props.onStatusChange(e);
  };

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin cổng thông tin</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onPortalEditUpdate(
                this.props.editData,
                e.target[0].value
              )
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Cổng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên cổng"
                  name="PortalName"
                  required
                  value={this.state.PortalData}
                  onChange={(value) => this.onChange(value)}
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
                  onChange={this.onStatusChange}
                  required
                  checked={this.state.Status === 1}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Chặn"
                  value="0"
                  name="status"
                  onChange={this.onStatusChange}
                  required
                  checked={this.state.Status === 0}
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

export default AdminPortalForm;
