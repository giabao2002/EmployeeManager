import React, { Component } from "react";
import "./DashboardAdmin.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";

import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import AdminSalary from "../Salary.jsx";
import Complaint from "./Complaint.jsx";
import Reward from "../Reward.jsx";
// import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks,
  faFile,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

function RoleAdminF() {
  return <Role />;
}
function RoleFormF() {
  return <RoleForm />;
}
function AdminSalaryF() {
  return <AdminSalary />;
}
function DepartmentF() {
  return <Department />;
}
function AdminPortalF() {
  return <AdminPortal />;
}
function AdminProjectBidF() {
  return <AdminProjectBid />;
}

function ComplaintHRF() {
  return <Complaint />;
}
function RewardF() {
  return <Reward />;
}

class DashboardAdmin extends Component {
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
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Quản trị viên
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Chức vụ
                  </Link>
                </li>
                <li>
                  <Link to="/admin/salary">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    Lương
                  </Link>
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    Phòng ban
                  </Link>
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    Dự án
                  </Link>
                </li>
                <li>
                  <Link to="/admin/complaint-admin">
                    <FontAwesomeIcon
                      icon={faFile}
                      className="sidebar-icon"
                    />
                    Khiếu nại
                  </Link>
                </li>
                <li>
                  <Link to="/admin/reward-admin">
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      className="sidebar-icon"
                    />
                    Khen thưởng, kỷ luật
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                    Cổng thông tin
                  </Link>
                </li> */}
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              <Switch>
                <Route exact path="/admin/role" component={RoleAdminF} />
                <Route exact path="/admin/salary" component={AdminSalaryF} />
                <Route path="/admin/department" exact component={DepartmentF} />
                <Route
                  path="/admin/project-bid"
                  exact
                  component={AdminProjectBidF}
                />
                <Route path="/admin/complaint-admin" exact component={ComplaintHRF} />
                <Route path="/admin/reward-admin" exact component={RewardF} />
                {/* <Route render={() => <NotFound404 />} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardAdmin;
