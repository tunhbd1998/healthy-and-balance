import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./auth.css";
import { get, pick, isEmpty, isEqual } from "lodash";
import { users } from "../../data";
import { validateAll } from "indicative/validator";
import { bindActionCreators } from "redux";
import { setUser, fetchCategories } from "../../store/actions";
import {
  signIn,
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../utils";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formatErrs: {
        username: "",
        password: "",
      },
      statusFail: "",
    };
  }

  handleChange = e => {
    // const { statusFail } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      formatErrs: {
        [e.target.name]: isEmpty(e.target.value) ? e.target.value : "",
      },
      statusFail: "",
    });
  };

  checkLogin(dataLogin) {
    // const dataSignUp = localStorage.getItem('myDataSignIn')
    // const alreadySignUp = get(dataSignUp,['username','password'])
    const normalUser = pick(users, ["ngtu", "nvphuoc", "phhviet"]);
    const admin = get(users, ["admin"]);
    const ngtuUser = get(normalUser, ["ngtu"]);
    const nvphuocUser = get(normalUser, ["nvphuoc"]);
    const phhvietUser = get(normalUser, ["phhviet"]);

    const isAdmin = isEqual(dataLogin, pick(admin, ["username", "password"]));
    const isngtu = isEqual(dataLogin, pick(ngtuUser, ["username", "password"]));
    const isnvphuoc = isEqual(
      dataLogin,
      pick(nvphuocUser, ["username", "password"])
    );
    const isphhviet = isEqual(
      dataLogin,
      pick(phhvietUser, ["username", "password"])
    );

    if (isAdmin === true) return "admin";
    if (isngtu === true || isnvphuoc === true || isphhviet === true)
      return "user";

    return "fail";
  }
  onSubmit = e => {
    e.preventDefault();
    const { formatErrs } = this.state;
    const message = {
      required: "Không được bỏ trống. Vui lòng nhập thông tin của bạn.",
    };
    const data = this.state;
    const rules = {
      username: "required|string",
      password: "required|string",
    };
    validateAll(data, rules, message)
      //if success redict to homepage
      .then(data => {
        const userRes = signIn(data.username, data.password);

        if (userRes) {
          saveDataToLocalStorage("user", JSON.stringify(userRes));
          this.props.actions.setUser(userRes);
          this.props.actions.fetchCategories();
        } else {
          this.setState({
            statusFail:
              "Tài khoản hoặc mật khẩu không đúng. Mời kiểm tra lại !",
          });
        }

        // const res = this.checkLogin(pick(data, ["username", "password"]));
        // if (res === "admin") {
        //   localStorage.setItem("role", "admin");
        //   return window.location.replace("/");
        // }
        // if (res === "user") {
        //   localStorage.setItem("role", "user");
        //   return window.location.replace("/");
        // }
        // if (res === "fail") {
        //   this.setState({
        //     statusFail:
        //       "Tài khoản hoặc mật khẩu không đúng. Mời kiểm tra lại !",
        //   });
        // }
      })
      .catch(errs => {
        console.log("error", errs);
        errs.forEach(element => {
          formatErrs[element.field] = element.message;
        });
        this.setState({ errs: formatErrs });
      });
  };
  render() {
    // const dataSignUp = localStorage.getItem('myDataSignIn')
    const { formatErrs } = this.state;
    const { statusFail } = this.state;
    const { user, actions } = this.props;

    if (user) {
      return <Redirect to="/" />;
    }

    if (JSON.parse(getDataFromLocalStorage("user"))) {
      actions.setUser(JSON.parse(getDataFromLocalStorage("user")));
      actions.fetchCategories();
    }

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
            {isEmpty(statusFail) ? (
              ""
            ) : (
              <div className="statusFail">
                <img src="/media/images/logo/noti.png" alt="img" />
                {statusFail}
              </div>
            )}
            <Form.Group controlId="formGroupEmail">
              <Form.Label
                className={
                  isEmpty(statusFail) && isEmpty(get(formatErrs, ["username"]))
                    ? ""
                    : "text__red"
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
                  isEmpty(statusFail) && isEmpty(get(formatErrs, ["username"]))
                    ? ""
                    : "border__red"
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
                  isEmpty(statusFail) && isEmpty(get(formatErrs, ["password"]))
                    ? ""
                    : "text__red"
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
                  isEmpty(statusFail) && isEmpty(get(formatErrs, ["password"]))
                    ? ""
                    : "border__red"
                }
              />
              <div className="alert__error">
                {get(formatErrs, ["password"])}
              </div>
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
                <img src="media/images/logo/google.png" alt="img" />
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
                <img src="media/images/logo/facebook.png" alt="img" />
                Đăng nhập bằng tài khoản Facebook
              </div>
            </Button>
          </div>
          <div className="forgot__password">
            <a href="/forgot-password">Quên mật khẩu ?</a>
          </div>
          <div className="form__other">
            Bạn chưa có có tài khoản? <a href="/sign-up">Đăng kí ngay</a>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: get(state, "user"),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setUser: setUser,
      fetchCategories,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
