import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import authUserListener from './authUserListener';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = authUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push('/signIn');
          } else {
            let pathname = this.props.history.location.pathname;

            if (condition(authUser) && (pathname === "/signIn" || pathname === "/signUp" || pathname === "/")) {
              this.props.history.push('/carDoc');
            }
          }
        },
        () => this.props.history.push('/signIn'),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;