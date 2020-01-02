import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./auth.css";
// import { get } from "lodash";
// import { validateAll } from "indicative/validator";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newpassowrd: "",
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGenderChange = e => {
    this.setState({ gender: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    // const data = this.state;
    // const rules = {
    //   newpassword: "required|string|min:6",
    //   password: "required|string|min:6",
    // };
    // validateAll( data,rules ).then(()=>{console.log('ok')}).catch(err=>{console.log(err)})
  };

  render() {
    // const {username,password,fullname,gender,email} = this.state
    return (
      <div>
        <Form className="form__auth" onSubmit={this.onSubmit}>
          <div className="header">
            <div className="header__title">
              <span>Sức Khỏe Blog</span>
            </div>
            <div className="header__logo">
              <img src="/media/images/logo/logo.png" alt="img" />
            </div>
            <div>KHÔI PHỤC MẬT KHẨU</div>
          </div>
          <div className="form__content">
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupNew">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="newpassword"
                onChange={this.handleChange}
              />
            </Form.Group>
          </div>
          <Button className="button__normal" type="submit">
            Hoàn thành
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;
