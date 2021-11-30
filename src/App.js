import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PasswordSubmit from "./components/passwordSubmit/passwordSubmit";
import EntropyInfo from "./components/entropyInfo/entropyInfo";
import RandomPwdComparison from "./components/randomPwdComparison/randomPwdComparison";


import './App.css';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"> <Redirect to="/passwordSubmit"></Redirect>  </Route>
          <Route exact path="/passwordSubmit" component={PasswordSubmit} />
          <Route exact path="/entropyInfo" component={EntropyInfo} />
          <Route exact path="/randomPassword" component={RandomPwdComparison} />
        </Switch>
      </Router>
    </div>
  );
}