import React, { Component } from "react";
// import "./DashboardHR.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import Department from "../Department.jsx";
import Employee from "../Employee.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "./LeaveApplicationHR.jsx";
import Reward from "../Reward.jsx";
// import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBuilding,
  faUser,
  faUserTie,
  faDollarSign,
  faFileAlt,
  faCity,
  faGlobeAmericas,
  faPlaceOfWorship,
  faArchway,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

function RoleHRF() {
  return <Role />;
}
function DepartmentF() {
  return <Department />;
}
function EmployeeF() {
  return <Employee />;
}
function SalaryF() {
  return <Salary />;
}
function LeaveApplicationHRF() {
  return <LeaveApplicationHR />;
}
function RewardF() {
  return <Reward />;
}

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true,
  };
  handleChange = (checked) => {
    console.log("switch");

    if (this.state.checked === true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  render() {
    return (
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>
          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                Quản lý nhân sự
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/hr/employee">
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    Người dùng
                  </Link>
                </li>
                <li>
                  <Link to="/hr/salary">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    Lương
                  </Link>
                </li>
                <li>
                  <Link to="/hr/leave-application-hr">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Đơn xin nghỉ phép
                  </Link>
                </li>
                <li>
                  <Link to="/hr/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Chức vụ
                  </Link>
                </li>
                <li>
                  <Link to="/hr/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    Phòng ban
                  </Link>
                </li>
                <li>
                  <Link to="/hr/reward-hr">
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      className="sidebar-icon"
                    />
                    Khen thưởng, kỷ luật
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              <Switch>
                <Redirect exact from="/hr" to="/hr/employee" />
                <Route path="/hr/employee" component={EmployeeF} />
                <Route path="/hr/salary" exact component={SalaryF} />
                <Route path="/hr/role" component={RoleHRF} />
                <Route path="/hr/department" exact component={DepartmentF} />
                <Route
                  path="/hr/leave-application-hr"
                  exact
                  component={LeaveApplicationHRF}
                />
                <Route path="/hr/reward-hr" exact component={RewardF} />
                {/* <Route render={() => <NotFound404 />} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;
