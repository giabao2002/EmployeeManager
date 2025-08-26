import React, { Component } from "react";
// import "./AdminProjectBidForm.css";
import axios from "axios";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

class AdminProjectBidForm extends Component {
  state = {
    status: "",
    portalsInfo: [],
  };
  portalsData = [];
  handleChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };
  loadPortalsInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/admin/portal", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.portalsData = response.data;

        this.portalsData = this.portalsData.filter(
          (data) => data["Status"] === 1
        );

        this.setState({ portalsInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadPortalsInfo();
  }
  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Thêm dự án</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onProjectBidSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên dự án
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên dự án"
                  name="ProjectTitle"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Đường dẫn (URL)
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Đường dẫn (URL)"
                  name="ProjectURL"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mô tả dự án
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="textarea" rows="3" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thời gian dự kiến
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Thời gian dự kiến (tháng)"
                  name="EstimatedTime"
                  min="0"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chi phí dự kiến
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Chi phí dự kiến"
                  min="0"
                  name="EstimatedCost"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nguồn đầu tư
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Nguồn đầu tư 1</option>
                  <option value="2">Nguồn đầu tư 2</option>
                  <option value="3">Nguồn đầu tư 3</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Trạng thái
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Hoạt động</option>
                  <option value="2">Tạm đóng</option>
                  <option value="3">Đã hủy</option>
                  <option value="4">Kết thúc</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ghi chú
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="textarea" rows="3" required />
              </Col>
            </Form.Group>
            <div className="button-group">
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
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminProjectBidForm;
