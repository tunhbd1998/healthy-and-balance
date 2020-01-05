import React from "react";
import { Form, Button } from "react-bootstrap";
import "./auth.css";
import { get, isEmpty } from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateAll } from "indicative/validator";
import BlankLayout from "../../../../layouts/blank-layout";
import { signUp } from "../../../../../store/actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function SignUp({ authInfo, actions }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [gender, setGender] = React.useState("-1");
  const [email, setEmail] = React.useState("");
  const [partErrors, setPartErrors] = React.useState({
    username: null,
    password: null,
    displayName: null,
    email: null,
    gender: null,
    required: null
  });

  const partErrorMessages = {
    required: "Vui lòng không bỏ trống",
    username: "Tên đăng nhập phải là một chuối các ký tự",
    email: "Email của bạn chưa đúng định dạng",
    password: "Mật khẩu nên có ít nhất 6 ký tự"
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = { username, password, email, displayName, gender };
    const rules = {
      username: "required|string",
      password: "required|string|min:6",
      email: "required|email",
      displayName: "required|string",
      gender: "required|integer|range:-1,1"
    };

    await validateAll(data, rules, partErrorMessages)
      .then(data => {
        console.log("data valid to sign up");
        actions.signUp(data);
      })
      .catch(errs => {
        const errors = {};
        console.log("errs", errs);
        errs.forEach(element => {
          errors[element.field] = element.message;
        });
        setPartErrors(errors);
      });
  };

  if (authInfo.status) {
    return <Redirect to="/auth/sign-in" />;
  }

  return (
    <BlankLayout>
      <Form className="form__auth" onSubmit={handleSubmit}>
        <div className="header">
          <div className="header__logo">
            <Link to="/">
              <img src="/media/images/logo/logo.png" alt="img" />
            </Link>
          </div>
          <div className="header__title">
            <span>Đăng ký</span>
          </div>
        </div>

        <div className="form__content">
          {isEmpty(authInfo.message) ? null : (
            <div className="statusFail">
              <img src="/media/images/logo/noti.png" alt="img" />
              {authInfo.message}
            </div>
          )}
          <Form.Group controlId="formGroupUsername">
            <Form.Label
              className={
                isEmpty(get(partErrors, ["username"])) ? "" : "text__red"
              }
            >
              Tên đăng nhập
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={
                isEmpty(get(partErrors, ["username"])) ? "" : "border__red"
              }
            />
            <div className="alert__error">
              {isEmpty(get(partErrors, ["username"]))
                ? ""
                : get(partErrors, ["username"])}
            </div>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label
              className={
                isEmpty(get(partErrors, ["password"])) ? "" : "text__red"
              }
            >
              Mật khẩu
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={
                isEmpty(get(partErrors, ["password"])) ? "" : "border__red"
              }
            />
            <div className="alert__error">{get(partErrors, ["password"])}</div>
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label
              className={isEmpty(get(partErrors, ["email"])) ? "" : "text__red"}
            >
              Email
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={
                isEmpty(get(partErrors, ["email"])) ? "" : "border__red"
              }
            />
            <div className="alert__error">{get(partErrors, ["email"])}</div>
          </Form.Group>

          <Form.Group controlId="formGroupFullName">
            <Form.Label
              className={
                isEmpty(get(partErrors, ["displayName"])) ? "" : "text__red"
              }
            >
              Họ và tên
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Họ và tên"
              name="displayName"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className={
                isEmpty(get(partErrors, ["displayName"])) ? "" : "border__red"
              }
            />
            <div className="alert__error">
              {get(partErrors, ["displayName"])}
            </div>
          </Form.Group>

          <Form.Group controlId="formGroupGender">
            <Form.Label
              className={
                isEmpty(get(partErrors, ["gender"])) ? "" : "text__red"
              }
            >
              Giới tính
            </Form.Label>
            <Form.Control
              as="select"
              onChange={e => setGender(e.target.value)}
              name="gender"
              value={gender}
              className={
                isEmpty(get(partErrors, ["gender"])) ? "" : "border__red"
              }
            >
              <option disabled value={-2}>
                Chọn
              </option>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
              <option value="-1">Khác</option>
            </Form.Control>
            <div className="alert__error">{get(partErrors, ["gender"])}</div>
          </Form.Group>
        </div>

        <Button className="button__normal" type="submit">
          Đăng kí
        </Button>
        <div className="form__option" style={{ margin: "15px 0" }}>
          <span>Đăng nhập qua</span>
          <Button
            className="btn__social__sign_up google"
            onClick={() => {
              window.location.replace("/auth/sign-in");
            }}
          >
            <img src="/media/images/logo/google.png" alt="google" />
          </Button>
          <Button
            className="btn__social__sign_up facebook"
            onClick={() => {
              window.location.replace("/auth/sign-in");
            }}
          >
            <img src="/media/images/logo/facebook.png" alt="facebook" />
          </Button>
        </div>
        <div className="form__other">
          Bạn đã có tài khoản? <a href="/auth/sign-in">Đăng nhập ngay</a>
        </div>
      </Form>
    </BlankLayout>
  );
}

export default connect(
  state => ({ authInfo: get(state, "authInfo") }),
  dispatch => ({ actions: bindActionCreators({ signUp }, dispatch) })
)(SignUp);
