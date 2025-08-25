import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class EducationForm extends Component {
  state = {
    SchoolUniversityData: this.props.editData["SchoolUniversity"],
    DegreeData: this.props.editData["Degree"],
    GradeData: this.props.editData["Grade"],
    PassingOfYearData: this.props.editData["PassingOfYear"],
  };
  onSchoolUniversityDataChange(e) {
    this.setState({ SchoolUniversityData: e.target.value });
  }
  onDegreeDataChange(e) {
    this.setState({ DegreeData: e.target.value });
  }
  onGradeDataChange(e) {
    this.setState({ GradeData: e.target.value });
  }
  onPassingOfYearDataChange(e) {
    this.setState({ PassingOfYearData: e.target.value });
  }
  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin học vấn</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onEducationEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Trường/Đại học
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Trường"
                  required
                  value={this.state.SchoolUniversityData}
                  onChange={(value) => this.onSchoolUniversityDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bằng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Bằng "
                  required
                  value={this.state.DegreeData}
                  onChange={(value) => this.onDegreeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Loại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Loại"
                  required
                  value={this.state.GradeData}
                  onChange={(value) => this.onGradeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Năm tốt nghiệp
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Năm tốt nghiệp"
                  required
                  value={this.state.PassingOfYearData}
                  onChange={(value) => this.onPassingOfYearDataChange(value)}
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

export default EducationForm;
