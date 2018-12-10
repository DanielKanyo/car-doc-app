import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import withAuthentication from '../Session/withAuthentication';

import Header from '../Header/Header';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import CarDoc from '../CarDoc/CarDoc';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route path="/" exact component={SignIn} />
          <Route path="/signIn/" component={SignIn} />
          <Route path="/signUp/" component={SignUp} />
          <Route path="/carDoc/" component={CarDoc} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
