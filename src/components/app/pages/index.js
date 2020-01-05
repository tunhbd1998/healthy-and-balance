import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./auth-page";
import UserPage from "./user-page";
import { shouldAuthenticated } from "../../../hoc/should-authenticated.hoc";
import { notify } from "../../../utils";

const AdminPage = Loadable({
  loader: () => import("./admin-page"),
  loading: () => "Loading"
});

export default function Pages() {
  console.log("pages");
  return (
    <>
      <Router>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route
            path="/admin/dashboard"
            component={shouldAuthenticated(AdminPage)}
          />
          <Route path="/" component={UserPage} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}
