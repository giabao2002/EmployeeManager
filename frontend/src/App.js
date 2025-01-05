import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import Login from "./component/Login.jsx";
import Temp from "./component/Temp.jsx";
// import NotFound404 from "./component/NotFound404.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";
import { Switch } from "react-router";

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  DefaultRoute,
} from "react-router-dom";
import history from "./history.js";

class App extends Component {
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
    messenger: "",
  };
  componentDidMount() {
    this.setState({
      data: {
        _id: localStorage.getItem("_id") || "",
        Account: localStorage.getItem("Account") || "",
        Name: localStorage.getItem("Name") || "",
      },
      isLogin: localStorage.getItem("isLogin") === "true",
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              this.state.data["Account"] == 1 ? (
                <Redirect to="/admin" />
              ) : this.state.data["Account"] == 2 ? (
                <Redirect to="/hr" />
              ) : this.state.data["Account"] == 3 ? (
                <Redirect to="/employee" />
              ) : (
                <Login
                  onSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  pass={this.state.pass}
                  mess={this.state.messenger}
                />
              )
            }
          />
          <Route
            path="/admin"
            render={(props) =>
              this.state.data["Account"] == 1 ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/hr"
            render={(props) =>
              this.state.data["Account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/employee"
            render={(props) =>
              this.state.data["Account"] == 3 ? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ pass: true });
    this.setState({ loading: true });
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };
  handleLogout = (event) => {
    console.log("logout");
    localStorage.clear();
    this.componentDidMount();
  };
  login = (id, pass) => {
    let bodyLogin = {
      email: id,
      password: pass,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/login", bodyLogin)
      .then((res) => {
        console.log(jwt.decode(res.data));
        var decodedData = jwt.decode(res.data);
        localStorage.setItem("token", res.data);
        if (
          (res == undefined ||
            res == null ||
            decodedData.Account == undefined ||
            decodedData.Account == null) &&
          !(
            decodedData.Account == 1 ||
            decodedData.Account == 2 ||
            decodedData.Account == 3
          )
        ) {
          this.setState({ pass: false });
          this.setState({ loading: false });
        } else {
          if (decodedData.Account == 1) {
            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 1);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();
            history.push("#/admin/role");
          }
          if (decodedData.Account == 2) {
            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 2);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();
            history.push("#/hr/employee");
          }
          if (decodedData.Account == 3) {
            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 3);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();

            history.push("#/employee/" + decodedData._id + "/personal-info");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 403) {
          this.setState({ messenger: err.response.data });
        }
        this.setState({ pass: false });
        this.setState({ loading: false });
      });
  };
}

export default App;
