import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { bindActionCreators } from "redux";
import { signInSuccess } from "../store/actions";
import { getCookie } from "../utils/cookies";
import { Redirect } from "react-router-dom";

export const shouldAuthenticated = WrappedComponent => {
  console.log("should auth");
  function WrapperComponent({ user, actions, ...props }) {
    if (!user) {
      const userInCookie = JSON.parse(getCookie("user") || null);

      if (!userInCookie) {
        return <Redirect to="/auth/sign-in" />;
      }

      actions.signInSuccess(userInCookie);
    }

    return <WrappedComponent {...props} />;
  }

  const ConnectedWrapperComponent = connect(
    state => ({
      user: get("state", ["user"])
    }),
    dispatch => ({
      actions: bindActionCreators({ signInSuccess }, dispatch)
    })
  )(WrapperComponent);

  return ConnectedWrapperComponent;
};
