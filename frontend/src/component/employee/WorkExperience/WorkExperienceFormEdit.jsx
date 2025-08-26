import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class WorkExperienceForm extends Component {
  state = {
    CompanyNameData: this.props.editData["CompanyName"],
    DesignationData: this.props.editData["Designation"],
    FromDateData: this.props.editData["FromDate"].slice(0, 10),
    ToDateData: this.props.editData["ToDate"].slice(0, 10),
  };
  onCompanyNameDataChange(e) {
    this.setState({ CompanyNameData: e.target.value });
  }
  onDesignationDataChange(e) {
    this.setState({ DesignationData: e.target.value });
  }
  onFromDateDataChange(e) {
    this.setState({ FromDateData: e.target.value });
  }
  onToDateDataChange(e) {
    this.setState({ ToDateData: e.target.value });
  }
  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa kinh nghiệm làm việc</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onWorkExperienceEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên công ty
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên công ty"
                  required
                  value={this.state.CompanyNameData}
                  onChange={(value) => this.onCompanyNameDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chức vụ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Chức vụ"
                  required
                  value={this.state.DesignationData}
                  onChange={(value) => this.onDesignationDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Từ ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  value={this.state.FromDateData}
                  onChange={(value) => this.onFromDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Đến ngày
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  value={this.state.ToDateData}
                  onChange={(value) => this.onToDateDataChange(value)}
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
      </div>
    );
  }
}

export default WorkExperienceForm;
