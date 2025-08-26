import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class FamilyInfoForm extends Component {
  state = {
    NameData: this.props.editData["Name"],
    RelationshipData: this.props.editData["Relationship"],
    DOBData: this.props.editData["DOB"].slice(0, 10),
    OccupationData: this.props.editData["Occupation"],
  };
  onNameDataChange(e) {
    this.setState({ NameData: e.target.value });
  }
  onRelationshipDataChange(e) {
    this.setState({ RelationshipData: e.target.value });
  }
  onOccupationDataChange(e) {
    this.setState({ OccupationData: e.target.value });
  }
  onDOBDataChange(e) {
    this.setState({ DOBData: e.target.value });
  }
  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">Chỉnh sửa thông tin gia đình</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onFamilyInfoEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Tên"
                  required
                  value={this.state.NameData}
                  onChange={(value) => this.onNameDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mối quan hệ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Mối quan hệ"
                  required
                  value={this.state.RelationshipData}
                  onChange={(value) => this.onRelationshipDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày sinh
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Ngày sinh"
                  required
                  value={this.state.DOBData}
                  onChange={(value) => this.onDOBDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nghề nghiệp
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Nghề nghiệp"
                  required
                  value={this.state.OccupationData}
                  onChange={(value) => this.onOccupationDataChange(value)}
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

export default FamilyInfoForm;
