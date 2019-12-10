import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import DashboardComponent from "../poster/DashboardComponent";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" exact component={null} />
        <Route path="/sign-up" exact component={null} />
        <Route path="/" component={DashboardComponent} />
        <Route path="/admin/sign-in" exact component={null} />
        <Route path="/admin/dashboard" component={null} />
      </Switch>
    </Router>
  );
}

export default App;
