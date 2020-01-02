import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { bindActionCreators } from "redux";
import { signInSuccess } from "../store/actions";
import { getCookie } from "../utils/cookies";

export const alreadyAuthenticated = WrappedComponent => {
  console.log("already auth");
  function WrapperComponent({ user, actions, ...props }) {
    if (!user) {
      const userInCookie = JSON.parse(getCookie("user") || null);
      if (userInCookie) {
        actions.signInSuccess(userInCookie);
      }
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
