import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./auth.css";
import { get, pick, isEmpty, isEqual } from "lodash";
import { users } from "../../../../../data";
import { validateAll } from "indicative/validator";
import { bindActionCreators } from "redux";
import { signIn, fetchCategories } from "../../../../../store/actions";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../../utils";

function SignIn({ user, authInfo, actions }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);

  const validateData = () => {
    let isValid = true;

    setErrorMessage(null);

    if (isEmpty(username) || isEmpty(password)) {
      isValid = false;
      setErrorMessage("Vui lòng không bỏ trống");
    }

    return isValid;
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (!validateData()) {
      return;
    }

    actions.signIn(username, password);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Form className="form__auth" onSubmit={handleSubmit}>
        <div className="header">
          <div className="header__logo">
            <Link to="/">
              <img src="/media/images/logo/logo.png" alt="img" />
            </Link>
          </div>
          <div className="header__title">
            <span>Đăng nhập</span>
          </div>
        </div>
        <div className="form__content">
          {isEmpty(errorMessage) && isEmpty(authInfo.message) ? null : (
            <div className="statusFail">
              <img src="/media/images/logo/noti.png" alt="img" />
              {errorMessage || authInfo.message}
            </div>
          )}
          <Form.Group controlId="formGroupEmail">
            <Form.Label
            // className={
            //   isEmpty(statusFail) && isEmpty(get(formatErrs, ["username"]))
            //     ? ""
            //     : "text__red"
            // }
            >
              Tên đăng nhập
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              name="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              // className={
              //   isEmpty(statusFail) && isEmpty(get(formatErrs, ["username"]))
              //     ? ""
              //     : "border__red"
              // }
            />
            {/* <div className="alert__error">
              {isEmpty(get(formatErrs, ["username"]))
                ? ""
                : get(formatErrs, ["username"])}
            </div> */}
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label
            // className={
            //   isEmpty(statusFail) && isEmpty(get(formatErrs, ["password"]))
            //     ? ""
            //     : "text__red"
            // }
            >
              Mật khẩu
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              // className={
              //   isEmpty(statusFail) && isEmpty(get(formatErrs, ["password"]))
              //     ? ""
              //     : "border__red"
              // }
            />
            {/* <div className="alert__error">{get(formatErrs, ["password"])}</div> */}
          </Form.Group>
        </div>
        <Button className="button__normal" type="submit">
          Đăng nhập
        </Button>
        <div className="form__option">
          <span>OR</span>
        </div>
        <div>
          <Button
            className="btn__social google"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <div className="form__social">
              <img src="/media/images/logo/google.png" alt="img" />
              Đăng nhập bằng tài khoản Google
            </div>
          </Button>
        </div>
        <div>
          <Button
            className="btn__social facebook"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <div className="form__social">
              <img src="/media/images/logo/facebook.png" alt="img" />
              Đăng nhập bằng tài khoản Facebook
            </div>
          </Button>
        </div>
        <div className="forgot__password">
          <a href="/forgot-password">Quên mật khẩu ?</a>
        </div>
        <div className="form__other">
          Bạn chưa có có tài khoản? <a href="/auth/sign-up">Đăng kí ngay</a>
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = state => ({
  user: get(state, "user"),
  authInfo: get(state, "authInfo")
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      signIn
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
