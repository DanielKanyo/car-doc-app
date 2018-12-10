import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import CarDoc from './CarDoc/CarDoc';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signIn/">SignIn</Link>
              </li>
              <li>
                <Link to="/signUp/">SignUp</Link>
              </li>
              <li>
                <Link to="/carDoc/">CarDoc</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/signIn/" component={SignIn} />
          <Route path="/signUp/" component={SignUp} />
          <Route path="/carDoc/" component={CarDoc} />
        </div>
      </Router>
    );
  }
}

export default App;
