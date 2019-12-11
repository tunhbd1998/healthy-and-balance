import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import DashboardComponent from "../poster/DashboardComponent";
import { getDataFromLocalStorage, prepareDataForApp } from "../../utils";
import Home from "../home";
import DashboardComponent from "../poster/DashboardComponent";
import SignIn from "../sign-in";
import SignUp from "../sign-up";
import ForgotPassword from "../forgot-password";
import PosterManageAdminComponent from "../admin/poster-manage/PosterManageAdminComponent";

export default function App() {
  const [ready, setReady] = React.useState(false);

  const updateReady = status => setReady(status);

  React.useEffect(() => {
    if (!getDataFromLocalStorage("commonCategories")) {
      prepareDataForApp();
      updateReady(true);
    } else {
      updateReady(true);
    }
  });

  return ready ? (
    <Router>
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route
          path="/me/manage-post"
          exact
          component={DashboardComponent}
        />
        <Route path="/admin/sign-in" exact component={null} />
        <Route path="/admin/dashboard/users" exact component={null} />
        <Route path="/admin/dashboard/categories" exact component={null} />
        <Route path="/admin/dashboard" exact component={PosterManageAdminComponent} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  ) : null;
}
