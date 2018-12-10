import React, { Component } from 'react';
import AuthUserContext from '../Session/AuthUserContext';

import HeaderAuth from './HeaderAuth';
import HeaderNonAuth from './HeaderNonAuth';

class Header extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? <HeaderAuth /> : <HeaderNonAuth />}
      </AuthUserContext.Consumer>
    )
  }
}

export default Header;