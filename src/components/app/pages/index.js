import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./auth-page";
import UserPage from "./user-page";
import { shouldAuthenticated } from "../../../hoc/should-authenticated.hoc";

const AdminPage = Loadable({
  loader: () => import("./admin-page"),
  loading: () => "Loading"
});

export default function Pages() {
  console.log("pages");
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route
          path="/admin/dashboard"
          component={shouldAuthenticated(AdminPage)}
        />
        <Route pasth="/" component={UserPage} />
      </Switch>
    </Router>
  );
}
