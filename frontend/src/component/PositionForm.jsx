import React, { Component } from "react";
// import "./PositionForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class PositionForm extends Component {
  state = {
    companyInfo: [],
  };
  companyData = [];
  loadCompanyInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/company", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.companyData = response.data;
        this.setState({ companyInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentWillMount() {
    this.loadCompanyInfo();
  }
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm chuyên môn</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onPositionSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Công ty
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="country" required>
                  <option value="" disabled selected>
                    Lựa chọn công ty
                  </option>
                  {this.companyData.map((data, index) => (
                    <option value={data["_id"]}>{data["CompanyName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chuyên môn
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Chuyên môn ngành nghề"
                  name="Position"
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

export default PositionForm;
