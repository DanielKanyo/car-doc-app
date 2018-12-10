import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HeaderNonAuth extends Component {
  render() {
    return (
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
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderNonAuth;