import React, { Component } from "react";
// import "./AdminProjectBidFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class AdminProjectBidFormEdit extends Component {
  state = {
    status: "",
    ProjectTitleData: this.props.editData["ProjectTitle"],
    ProjectURLData: this.props.editData["ProjectURL"],
    ProjectDescriptionData: this.props.editData["ProjectDesc"],
    EstimatedTimeData: this.props.editData["EstimatedTime"],
    EstimatedCostData: this.props.editData["EstimatedCost"],
    RemarkData: this.props.editData["Remark"],
  };
  onProjectTitleDataChange(e) {
    this.setState({ ProjectTitleData: e.target.value });
  }
  onProjectURLDataChange(e) {
    this.setState({ ProjectURLData: e.target.value });
  }
  onProjectDescriptionDataChange(e) {
    this.setState({ ProjectDescriptionData: e.target.value });
  }
  onEstimatedTimeDataChange(e) {
    this.setState({ EstimatedTimeData: e.target.value });
  }
  onEstimatedCostDataChange(e) {
    this.setState({ EstimatedCostData: e.target.value });
  }
  onResourceDataChange(e) {
    this.setState({ ResourceData: e.target.value });
  }
  onStatusDataChange(e) {
    this.setState({ StatusData: e.target.value });
  }
  onRemarkDataChange(e) {
    this.setState({ RemarkData: e.target.value });
  }

  portalsData = [];
  handleChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Chỉnh sửa thông tin dự án</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onProjectBidEditUpdate(this.props.editData, e)
            }
          >
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
                  value={this.state.ProjectTitleData}
                  onChange={(value) => this.onProjectTitleDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Đường dân (URL)
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Đường dẫn (URL)"
                  name="ProjectURL"
                  required
                  value={this.state.ProjectURLData}
                  onChange={(value) => this.onProjectURLDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mô tả dự án
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  value={this.state.ProjectDescriptionData}
                  onChange={(value) =>
                    this.onProjectDescriptionDataChange(value)
                  }
                />
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
                  min="0"
                  name="EstimatedTime"
                  required
                  value={this.state.EstimatedTimeData}
                  onChange={(value) => this.onEstimatedTimeDataChange(value)}
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
                  value={this.state.EstimatedCostData}
                  onChange={(value) => this.onEstimatedCostDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nguồn đầu tư
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option
                    value="1"
                    selected={this.props.editData["ResourceID"] === 1}
                  >
                    Nguồn đầu tư 1
                  </option>
                  <option
                    value="2"
                    selected={this.props.editData["ResourceID"] === 2}
                  >
                    Nguồn đầu tư 2
                  </option>
                  <option
                    value="3"
                    selected={this.props.editData["ResourceID"] === 3}
                  >
                    Nguồn đầu tư 3
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Trạng thái
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option
                    value="1"
                    selected={this.props.editData["Status"] === 1}
                  >
                    Hoạt động
                  </option>
                  <option
                    value="2"
                    selected={this.props.editData["Status"] === 2}
                  >
                    Tạm đóng
                  </option>
                  <option
                    value="3"
                    selected={this.props.editData["Status"] === 3}
                  >
                    Đã hủy
                  </option>
                  <option
                    value="4"
                    selected={this.props.editData["Status"] === 4}
                  >
                    Kết thúc
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ghi chú
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  value={this.state.RemarkData}
                  onChange={(value) => this.onRemarkDataChange(value)}
                />
              </Col>
            </Form.Group>
            <div className="button-group">
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
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminProjectBidFormEdit;
