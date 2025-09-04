import React, { Component } from "react";
import "./Login.css";
import Logo from "../../img/logo1.png";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

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
            <h2 className="title">Đăng nhập</h2>
            <div id="outer-login-form-div">
              <form action="" method="" onSubmit={this.props.onSubmit}>
                <div className="input-group">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    className="login-form-input"
                    type="text"
                    placeholder="Email"
                    required="required"
                    name="Email"
                  />
                </div>
                <div className="input-group">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    className="login-form-input"
                    type="password"
                    placeholder="Mật khẩu"
                    required="required"
                  />
                </div>
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Ghi nhớ tôi</label>
                  </div>
                  <button type="button" className="forgot-password">
                    Quên mật khẩu?
                  </button>
                </div>
                <input type="submit" value="Đăng nhập" id="submitBtn" />
                {!this.props.pass ? (
                  <p className="alert">
                    {this.props.mess
                      ? this.props.mess
                      : "Tên người dùng hoặc mật khẩu không hợp lệ!"}
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
                color={"#ffffff"}
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
