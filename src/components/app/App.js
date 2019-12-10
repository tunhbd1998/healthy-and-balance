import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import DashboardComponent from "../poster/DashboardComponent";
import { getDataFromLocalStorage, prepareDataForApp } from "../../utils";
import Home from "../home";
import DashboardComponent from "../poster/DashboardComponent";

export default function App() {
  const [ready, setReady] = React.useState(false);

  const updateReady = status => setReady(status);

  React.useEffect(() => {
    if (!getDataFromLocalStorage("commonCategories")) {
      console.log("jojo");
      prepareDataForApp();
      updateReady(true);
    } else {
      updateReady(true);
    }
  });

  return ready ? (
    <Router>
      <Switch>
        <Route path="/sign-in" exact component={null} />
        <Route path="/sign-up" exact component={null} />
        <Route path="/" exact component={Home} />
        <Route path="/management" exact component={DashboardComponent} />
        <Route path="/admin/sign-in" exact component={null} />
        <Route path="/admin/dashboard" exact component={null} />
      </Switch>
    </Router>
  ) : null;
}
