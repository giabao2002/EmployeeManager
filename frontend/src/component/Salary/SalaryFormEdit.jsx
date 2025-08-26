import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class SalaryFormEdit extends Component {
  state = {
    salaryData: [],
    BasicSalaryData: this.props.editData["salary"][0]["BasicSalary"],
    BankNameData: this.props.editData["salary"][0]["BankName"],
    AccountNoData: this.props.editData["salary"][0]["AccountNo"],
    ReAccountNoData: this.props.editData["salary"][0]["AccountNo"],
    AccountHolderNameData:
      this.props.editData["salary"][0]["AccountHolderName"],
    IFSCcodeData: this.props.editData["salary"][0]["IFSCcode"],
    TaxDeductionData: this.props.editData["salary"][0]["TaxDeduction"],
    ReceivingDate: this.props.editData["salary"][0]["ReceivingDate"],
  };
  onBasicSalaryDataChange(e) {
    this.setState({ BasicSalaryData: e.target.value });
  }
  onBankNameDataChange(e) {
    this.setState({ BankNameData: e.target.value });
  }
  onAccountNoDataChange(e) {
    this.setState({ AccountNoData: e.target.value });
  }
  onReAccountNoDataChange(e) {
    this.setState({ ReAccountNoData: e.target.value });
  }
  onAccountHolderNameDataChange(e) {
    this.setState({ AccountHolderNameData: e.target.value });
  }
  onIFSCcodeDataChange(e) {
    this.setState({ IFSCcodeData: e.target.value });
  }
  onTaxDeductionDataChange(e) {
    this.setState({ TaxDeductionData: e.target.value });
  }

  onReceivingDateChange(e) {
    this.setState({ ReceivingDate: e.target.value });
  }

  loadSalaryInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/salary", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ salaryData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.loadSalaryInfo();
  }
  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Chỉnh sửa thông tin lương</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onSalaryEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Chọn nhân viên
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  {this.state.salaryData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={this.props.editData["_id"] === data["_id"]}
                      disabled
                    >
                      {data["FirstName"] +
                        " " +
                        data["MiddleName"] +
                        " " +
                        data["LastName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Lương cơ bản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Lương cơ bản"
                  required
                  value={this.state.BasicSalaryData}
                  onChange={(value) => this.onBasicSalaryDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên ngân hàng
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên ngân hàng"
                  required
                  value={this.state.BankNameData}
                  onChange={(value) => this.onBankNameDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Số tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Số tài khoản"
                  required
                  value={this.state.AccountNoData}
                  onChange={(value) => this.onAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nhập lại số tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Nhập lại số tài khoản"
                  required
                  value={this.state.ReAccountNoData}
                  onChange={(value) => this.onReAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tên chủ tài khoản
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Tên chủ tài khoản"
                  required
                  value={this.state.AccountHolderNameData}
                  onChange={(value) =>
                    this.onAccountHolderNameDataChange(value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Mã SWIFT
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Mã ngân hàng"
                  required
                  value={this.state.IFSCcodeData}
                  onChange={(value) => this.onIFSCcodeDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Thuế khấu trừ
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Thuế khấu trừ"
                  min="0"
                  required
                  value={this.state.TaxDeductionData}
                  onChange={(value) => this.onTaxDeductionDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Ngày nhận
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  min="1"
                  max="31"
                  value={this.state.ReceivingDate}
                  onChange={(value) => this.onReceivingDateChange(value)}
                />
              </Col>
            </Form.Group>

            <div className="button-group">
              <Form.Group as={Row} id="form-submit-button">
                <Col>
                  <Button type="submit">Cập nhật</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} id="form-cancel-button">
                <Col id="form-cancel-button-inner">
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

export default SalaryFormEdit;
