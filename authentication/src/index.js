import React from "react";
import ReactDOM from "react-dom";
import history from "./history";
import { Router, Switch, Route } from "react-router-dom";
import Auth from "./Auth";

const auth = new Auth();

import { App, Ramen, Sushi } from "./components";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => <App auth={auth} />} />
      <Route path="/ramen" component={Ramen} />
      <Route path="/sushi" component={Sushi} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
