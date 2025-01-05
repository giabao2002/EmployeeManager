import React, { Component } from "react";
// import "./StateForm.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class StateForm extends Component {
  state = {
    countryInfo: [],
  };
  countryData = [];
  loadCountryInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/country", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.countryData = response.data;

        this.setState({ countryInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentWillMount() {
    this.loadCountryInfo();
  }
  render() {
    return (
      <div>
        <h2 id="role-form-title">Thêm khu vực</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onStateSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Quốc gia
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="country" required>
                  <option value="" disabled selected>
                    Chọn quốc gia
                  </option>
                  {this.countryData.map((data, index) => (
                    <option value={data["_id"]}>{data["CountryName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Khu vực
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên khu vực"
                  name="State"
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

export default StateForm;
