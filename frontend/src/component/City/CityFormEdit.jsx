import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class CityForm extends Component {
  state = {
    CityData: this.props.editData["CityName"],
    stateData: this.props.editData["state"][0]["StateName"],
    filteredStateData: [],
    countryData: this.props.editData["state"][0]["country"][0]["CountryName"],
    listCountry: [],
    listState: [],
    filteredCountryData: [],
  };

  onChange(e) {
    this.setState({ CityData: e.target.value });
  }
  loadCountryInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/country`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ listCountry: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  loadStateInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/state", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ listState: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.loadCountryInfo();
    this.loadStateInfo();
  }
  onCountryChange(e) {
    console.log(e.target.value);
    let currentCountry = e.target.value;
    let filteredState = this.state.listState.filter(
      (data) => data["country"][0]["_id"] === currentCountry
    );
    this.setState({ filteredStateData: filteredState });
  }

  onSelectCountry = (e, data) => {
    return this.props.editData["state"][0]["country"][0]["_id"] === data["_id"];
  };

  render() {
    console.log(this.props.editData);
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin thành phố</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onCityEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Quốc gia
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="country"
                  onChange={this.onCountryChange.bind(this)}
                >
                  {this.state.countryData ? (
                    <option value={this.props.editData['state'][0]["country"][0]["_id"]} selected>
                      {this.state.countryData}
                    </option>
                  ) : (
                    <>
                      <option value="" disabled selected>
                        Chọn quốc gia
                      </option>
                    </>
                  )}
                  {this.state.listCountry
                    .filter(
                      (elm) => elm["CountryName"] != this.state.countryData
                    )
                    .map((data, index) => (
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
                <Form.Control as="select" name="state" required>
                  {this.state.stateData &&
                  this.state.filteredStateData.length < 1 ? (
                    <option value={this.props.editData['state'][0]["_id"]} selected>
                      {this.state.stateData}
                    </option>
                  ) : (
                    <>
                      <option value="" disabled selected>
                        Chọn khu vực
                      </option>
                    </>
                  )}
                  {this.state.filteredStateData
                    .filter((elm) => elm["StateName"] != this.state.stateData)
                    .map((data, index) => (
                      <option
                        value={data["_id"]}
                        selected={
                          this.props.editData["state"][0]["_id"] == data["_id"]
                        }
                      >
                        {data["StateName"]}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thành phố
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên thành phố"
                  name="City"
                  required
                  onChange={(value) => this.onChange(value)}
                  value={this.state.CityData}
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

export default CityForm;
// onChange={value => this.onChange(value)}
