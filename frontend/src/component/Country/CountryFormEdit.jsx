import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class CountryForm extends Component {
  state = {
    CountryData: this.props.editData["CountryName"],
  };
  onChange(e) {
    this.setState({ CountryData: e.target.value });
  }

  render() {
    return (
      <div>
        <h2 id="role-form-title">Edit Country Details</h2>

        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onCountryEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên quốc gia
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên quốc gia"
                  name="CountryName"
                  required
                  value={this.state.CountryData}
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

export default CountryForm;
