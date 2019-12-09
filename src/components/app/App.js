import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "../commons/button";
import "./App.css";
import Dialog from "../commons/dialog";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" exact component={null} />
        <Route path="/sign-up" exact component={null} />
        <Route path="/" component={null} />
        <Route path="/admin/sign-in" exact component={null} />
        <Route path="/admin/dashboard" component={null} />
      </Switch>
    </Router>
  );
}

export default App;
