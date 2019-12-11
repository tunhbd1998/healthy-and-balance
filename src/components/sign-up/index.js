import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./auth.css";
import { get, isEmpty } from "lodash";
import { validateAll } from "indicative/validator";
// import { format } from 'upath';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      fullname: "",
      gender: "-1",
      formatErrs: {
        username: "",
        password: "",
        email: "",
        fullname: "",
        gender: "",
      },
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formatErrs: {
        [e.target.name]: isEmpty(e.target.value) ? e.target.value : "",
      },
    });
  };

  handleGenderChange = e => {
    this.setState({ gender: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state);
    const { formatErrs } = this.state;
    const message = {
      required: "Không được bỏ trống. Vui lòng nhập thông tin của bạn.",
      "email.email": "Email không đúng định dạng. Hãy nhập lại !",
      "password.min": "Mật khẩu có ít nhất 6 kí tự. Hãy nhập lại !",
      "gender.range": "Vui lòng chọn giới tính của bạn.",
    };
    const data = this.state;
    const rules = {
      username: "required|string",
      password: "required|string|min:6",
      email: "required|email",
      fullname: "required|string",
      gender: "required|integer|range:0,2",
    };
    validateAll(data, rules, message)
      //if success redict to homepage
      .then(data => {
        console.log(data);
        localStorage.setItem("myDataSignIn", JSON.stringify(data));
        window.location.replace("/sign-in");
      })
      .catch(errs => {
        errs.forEach(element => {
          formatErrs[element.field] = element.message;
        });
        this.setState({ errs: formatErrs });
        console.log(formatErrs);
      });
  };

  render() {
    const { username, password, fullname, gender, email } = this.state;
    const { formatErrs } = this.state;
    // console.log("aa", isEmpty(get(formatErrs, ["username"])));

    return (
      <div>
        <Form className="form__auth" onSubmit={this.onSubmit}>
          <div className="header">
            <div className="header__logo">
              <img src="/media/images/logo/logo.png" alt="img" />
            </div>
            <div className="header__title">
              <span>Sức Khỏe Blog</span>
            </div>
          </div>

          <div className="form__content">
            <Form.Group controlId="formGroupUsername">
              <Form.Label
                className={
                  isEmpty(get(formatErrs, ["username"])) ? "" : "text__red"
                }
              >
                Tên đăng nhập
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên đăng nhập"
                name="username"
                onChange={this.handleChange}
                className={
                  isEmpty(get(formatErrs, ["username"])) ? "" : "border__red"
                }
              />
              <div className="alert__error">
                {isEmpty(get(formatErrs, ["username"]))
                  ? ""
                  : get(formatErrs, ["username"])}
              </div>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label
                className={
                  isEmpty(get(formatErrs, ["password"])) ? "" : "text__red"
                }
              >
                Mật khẩu
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                onChange={this.handleChange}
                className={
                  isEmpty(get(formatErrs, ["password"])) ? "" : "border__red"
                }
              />
              <div className="alert__error">
                {get(formatErrs, ["password"])}
              </div>
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label
                className={
                  isEmpty(get(formatErrs, ["email"])) ? "" : "text__red"
                }
              >
                Email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                className={
                  isEmpty(get(formatErrs, ["email"])) ? "" : "border__red"
                }
              />
              <div className="alert__error">{get(formatErrs, ["email"])}</div>
            </Form.Group>
            <Form.Group controlId="formGroupFullName">
              <Form.Label
                className={
                  isEmpty(get(formatErrs, ["fullname"])) ? "" : "text__red"
                }
              >
                Họ và tên
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="fullname"
                onChange={this.handleChange}
                className={
                  isEmpty(get(formatErrs, ["fullname"])) ? "" : "border__red"
                }
              />
              <div className="alert__error">
                {get(formatErrs, ["fullname"])}
              </div>
            </Form.Group>
            <Form.Group controlId="formGroupGender">
              <Form.Label
                className={
                  isEmpty(get(formatErrs, ["gender"])) ? "" : "text__red"
                }
              >
                Giới tính
              </Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleChange}
                name="gender"
                value={gender}
                className={
                  isEmpty(get(formatErrs, ["gender"])) ? "" : "border__red"
                }
              >
                <option disabled value={-1}>
                  Chọn
                </option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Khác</option>
              </Form.Control>
              <div className="alert__error">{get(formatErrs, ["gender"])}</div>
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
                window.location.replace("/sign-in");
              }}
            >
              <img src="media/images/logo/google.png" />
            </Button>
            <Button
              className="btn__social__sign_up facebook"
              onClick={() => {
                window.location.replace("/sign-in");
              }}
            >
              <img src="media/images/logo/facebook.png" />
            </Button>
          </div>
          <div className="form__other">
            Bạn đã có tài khoản? <a href="/sign-in">Đăng nhập ngay</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignIn;
