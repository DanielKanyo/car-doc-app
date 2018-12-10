import React, { Component } from 'react';
import withAuthorization from '../Session/withAuthorization';

class CarDoc extends Component {
  render() {
    return (
      <div className="component-content">
        CarDoc
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CarDoc);