import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import OtherPage from "./OtherPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/other" component={OtherPage} />
      </Switch>
    </Router>
  );
};

export default App;
