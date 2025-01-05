import React, { Component } from "react";
import "./EmployeeInfo.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import { HashRouter as Router, Route, Link } from "react-router-dom";

export class EmployeeInfo extends Component {
  render() {
    return (
      <div>
        <div onClick={this.props.onBack}>
          {" "}
          <Button variant="primary" id="add-button">
            Trở lại
          </Button>
        </div>

        <h2 id="role-title">
          Thông tin nhân viên{" "}
          {this.props.data["FirstName"] + " " + this.props.data["LastName"]}
        </h2>
        <div id="outer-empingo-div">
          {/* <Link to="/hr/employee/info/personal-info">
            <Button
              variant="outline-primary"
              size="lg"
              block
              className="empinfo-button"
            >
              Thông tin cá nhân
            </Button>
          </Link> */}
          <Link to="/hr/employee/info/education">
            <Button
              variant="outline-primary"
              size="lg"
              block
              className="empinfo-button"
            >
              Học vấn
            </Button>
          </Link>
          <Link to="/hr/employee/info/family-info">
            <Button
              variant="outline-primary"
              size="lg"
              block
              className="empinfo-button"
            >
              Thông tin gia đình
            </Button>
          </Link>
          <Link to="/hr/employee/info/work-experience">
            <Button
              variant="outline-primary"
              size="lg"
              block
              className="empinfo-button"
            >
              Kinh nghiệm làm việc
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default EmployeeInfo;
