import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { withPageTitle } from "../../../../hoc/with-page-title.hoc";

export default function AuthPage() {
  console.log("auth page");
  return (
    <>
      {/* <Switch> */}
      <Route
        path="/auth/sign-in"
        exact
        component={withPageTitle(SignIn, "Đăng nhập")}
      />
      <Route
        path="/auth/sign-up"
        exact
        component={withPageTitle(SignUp, "Đăng ký")}
      />
      {/* </Switch> */}
    </>
  );
}
