import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../img/logo1.png";

class NavBar extends Component {

  render() {
    const { loginInfo } = this.props;
    const avatarUrl = loginInfo.Photo ? '/uploads/'+ loginInfo.Photo : Logo;
    console.log('url', avatarUrl)
    return (
      <div>
        <Navbar
          bg="light"
          expand="lg"
          className="nav-bar"
          fixed="top"
          id="main-nav"
        >
          <Navbar.Brand id="logo-anchor">
            <img id="nav-bar-logo" src={Logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="logout-navbar-nav">
            <Nav className="ml-auto">
              <a onClick={this.props.onClick} className="navbar-right-content">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                {loginInfo["Name"]}
              </a>
              <a
                onClick={this.props.onLogout}
                style={{ cursor: "pointer" }}
                className="navbar-right-content btnLogout"
              >
                Đăng xuất
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
