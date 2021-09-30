import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "../Admin/Admin";
import Landing from "../Landing/Landing";

class MainContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default MainContainer;
