import React, { Component } from "react";
// import "./PersonalInfoFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class PersonalInfoFormEdit extends Component {
  state = {
    GenderData: this.props.editData["Gender"],
    EmailData: this.props.editData["Email"],
    FirstNameData: this.props.editData["FirstName"],
    MiddleNameData: this.props.editData["MiddleName"],
    LastNameData: this.props.editData["LastName"],
    DOBData: this.props.editData["DOB"].slice(0, 10),
    ContactNoData: this.props.editData["ContactNo"],
    EmergencyContactNoData: this.props.editData["EmergencyContactNo"] || "",
    PANcardNoData: this.props.editData["PANcardNo"] || "",
    HobbiesData: this.props.editData["Hobbies"] || "",
    PresentAddressData: this.props.editData["PresentAddress"] || "",
    PermanetAddressData: this.props.editData["PermanetAddress"] || "",
    Photo: null,
  };
  onEmailDataChange(e) {
    this.setState({ EmailData: e.target.value });
  }
  onFirstNameDataChange(e) {
    this.setState({ FirstNameData: e.target.value });
  }
  onMiddleNameDataChange(e) {
    this.setState({ MiddleNameData: e.target.value });
  }
  onLastNameDataChange(e) {
    this.setState({ LastNameData: e.target.value });
  }
  onContactNoDataChange(e) {
    this.setState({ ContactNoData: e.target.value });
  }
  onPANcardNoDataChange(e) {
    this.setState({ PANcardNoData: e.target.value });
  }
  onEmergencyContactNoDataChange(e) {
    this.setState({ EmergencyContactNoData: e.target.value });
  }
  onHobbiesDataChange(e) {
    this.setState({ HobbiesData: e.target.value });
  }
  onPresentAddressDataChange(e) {
    this.setState({ PresentAddressData: e.target.value });
  }
  onPresentAddressDataChange(e) {
    this.setState({ PresentAddressData: e.target.value });
  }
  onPermanetAddressDataChange(e) {
    this.setState({ PermanetAddressData: e.target.value });
  }
  onGenderChange = (e) => {
    this.setState({ GenderData: e.target.value });
    this.props.onGenderChange(e);
  };
  onDOBDataChange = (e) => {
    console.log(e.target.value);
    this.setState({ DOBData: e.target.value });
  };
  onPhotoChange = (e) => {
    this.setState({ Photo: e.target.files[0] });
  };

  componentWillMount() {}
  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Chỉnh sửa thông tin cá nhân</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onPersonalInfoEditUpdate(this.props.editData, e, this.state.Photo)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên"
                  required
                  disabled
                  value={this.state.FirstNameData}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên đệm
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên đệm"
                  required
                  disabled
                  value={this.state.MiddleNameData}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Họ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Họ"
                  disabled
                  required
                  value={this.state.LastNameData}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Giới tính
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  type="radio"
                  label="Nam"
                  value="male"
                  name="gender"
                  onChange={this.onGenderChange}
                  checked={this.state.GenderData === "male"}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Nữ"
                  value="female"
                  name="gender"
                  onChange={this.onGenderChange}
                  checked={this.state.GenderData === "female"}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thông tin liên hệ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Thông tin liên hệ "
                  required
                  value={this.state.ContactNoData}
                  onChange={(value) => this.onContactNoDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Số điện thoại khẩn cấp
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại khẩn cấp"
                  required
                  value={this.state.EmergencyContactNoData}
                  onChange={(value) =>
                    this.onEmergencyContactNoDataChange(value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={this.state.EmailData}
                  onChange={(value) => this.onEmailDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mã định danh
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Mã định danh"
                  required
                  value={this.state.PANcardNoData}
                  onChange={(value) => this.onPANcardNoDataChange(value)}
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
                Nhóm máu
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option defaultValue="" disabled selected>
                    Chọn nhóm máu
                  </option>
                  <option
                    value="A+"
                    selected={this.props.editData["BloodGroup"] === "A+"}
                  >
                    A+
                  </option>
                  <option
                    value="A-"
                    selected={this.props.editData["BloodGroup"] === "A-"}
                  >
                    A-
                  </option>
                  <option
                    value="B+"
                    selected={this.props.editData["BloodGroup"] === "B+"}
                  >
                    B+
                  </option>
                  <option
                    value="B-"
                    selected={this.props.editData["BloodGroup"] === "B-"}
                  >
                    B-
                  </option>
                  <option
                    value="AB+"
                    selected={this.props.editData["BloodGroup"] === "AB+"}
                  >
                    AB+
                  </option>
                  <option
                    value="AB-"
                    selected={this.props.editData["BloodGroup"] === "AB-"}
                  >
                    AB-
                  </option>
                  <option
                    value="O+"
                    selected={this.props.editData["BloodGroup"] === "O+"}
                  >
                    O+
                  </option>
                  <option
                    value="O-"
                    selected={this.props.editData["BloodGroup"] === "O-"}
                  >
                    O-
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Sở thích
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Sở thích"
                  required
                  value={this.state.HobbiesData}
                  onChange={(value) => this.onHobbiesDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Địa chỉ hiện tại
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder="Địa chỉ hiện tại"
                  required
                  value={this.state.PresentAddressData}
                  onChange={(value) => this.onPresentAddressDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Địa chỉ thường trú
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder=" Địa chỉ thường trú"
                  required
                  value={this.state.PermanetAddressData}
                  onChange={(value) => this.onPermanetAddressDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ảnh đại diện
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="file"
                  onChange={this.onPhotoChange}
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
                <Button type="reset" onClick={this.props.onFormEditClose}>
                  Hủy
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonalInfoFormEdit;
