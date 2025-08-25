import React, { Component } from "react";
import "./DashboardEmployee.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import Complaint from "./Complaint.jsx";
import Salary from "./Salary.jsx";
import Reward from "./Reward.jsx";
import Statistics from "./Statistics.jsx";
// import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale,
  faTicketAlt,
  faFile,
  faCalendarDay,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";

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
              
              <div id="main-title" className="main-title-employee">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Nhân viên
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/personal-info"
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    Thông tin cá nhân
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/" + this.props.data["_id"] + "/education"}
                  >
                    <FontAwesomeIcon
                      icon={faUniversity}
                      className="sidebar-icon"
                    />
                    Học vấn
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/" + this.props.data["_id"] + "/family-info"}
                  >
                    <FontAwesomeIcon icon={faMale} className="sidebar-icon" />
                    Thông tin gia đình
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/work-experience"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="sidebar-icon"
                    />
                    Kinh nghiệm làm việc
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.props.data["_id"] +
                      "/leave-application-emp"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Nghỉ phép
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/" + this.props.data["_id"] + "/complaint"}
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                      className="sidebar-icon"
                    />
                    Khiếu nại
                  </Link>
                </li>
                {/* <li>
                  <Link to={"/employee/" + this.props.data["_id"] + "/salary"}>
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="sidebar-icon"
                    />
                    Lịch sử nhận lương
                  </Link>
                </li> */}
                <li>
                  <Link to={"/employee/" + this.props.data["_id"] + "/reward"}>
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      className="sidebar-icon"
                    />
                    Khen thưởng, kỷ luật
                  </Link>
                </li>
                <li>
                  <Link to={"/employee/" + this.props.data["_id"] + "/statistics"}>
                    <FontAwesomeIcon
                      icon={faChartArea}
                      className="sidebar-icon"
                    />
                    Lịch sử nhận lương
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              
              <Switch>
                <Route
                  exact
                  path="/employee/:id/personal-info"
                  render={(props) => (
                    <PersonalInfo data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/education"
                  render={(props) => (
                    <Education data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/family-info"
                  render={(props) => (
                    <FamilyInfo data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/work-experience"
                  render={(props) => (
                    <WorkExperience data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/complaint"
                  render={(props) => (
                    <Complaint data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/salary"
                  render={(props) => (
                    <Salary data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/leave-application-emp"
                  render={(props) => (
                    <LeaveApplicationEmp data={this.props.data} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/reward"
                  render={(props) => (
                    <Reward data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/statistics"
                  render={(props) => (
                    <Statistics data={this.props.data} back={false} />
                  )}
                />
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
