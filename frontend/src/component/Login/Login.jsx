import React, { Component } from "react";
import "./Login.css";
import Logo from "../../img/logo1.png";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Login extends Component {
  render() {
    return (
      <div className="login-body">
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
              <h4 className="title">Đăng nhập</h4>
            </div>
            <div id="outer-login-form-div">
              <form action="" method="" onSubmit={this.props.onSubmit}>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder="Email"
                  required="required"
                  name="Username"
                />
                <input
                  className="login-form-input"
                  type="password"
                  placeholder="Mật khẩu"
                  required="required"
                />
                <input
                  className="login-form-input"
                  type="submit"
                  value="Đăng nhập"
                  id="submitBtn"
                />
                {!this.props.pass ? (
                  <p className="alert">
                    {this.props.mess ? this.props.mess : "Tên người dùng hoặc mật khẩu không hợp lệ!"}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </div>
            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={this.props.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
