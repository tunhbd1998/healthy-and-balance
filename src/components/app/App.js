import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.css";
import { getDataFromLocalStorage, prepareDataForApp } from "../../utils";
import { alreadyAuthenticated } from "../../hoc/already-authenticated.hoc";

const Pages = Loadable({
  loader: () => import("./pages"),
  loading: () => "Loading"
});

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
        <Route path="/" component={alreadyAuthenticated(Pages)} />
      </Switch>
    </Router>
  ) : null;
}
