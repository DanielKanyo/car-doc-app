import React, { Component } from 'react';
import { Link } from "react-router-dom";
import withAuthorization from '../Session/withAuthorization';
import { auth } from '../Firebase';

class HeaderAuth extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/carDoc/">CarDoc</Link>
            </li>
            <li>
              <button onClick={auth.doSignOut}>Sign Out</button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HeaderAuth);