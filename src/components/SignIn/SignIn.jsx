import React, { Component } from 'react';
import { auth } from '../Firebase';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    };
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = event => {
    const { email, password, errorMsg } = this.state;
    const { history } = this.props;

    auth.signInWithEmailAndPassword(email, password).then(() => {
      history.push('/carDoc');
    }).catch(error => {
      this.setState({ errorMsg });
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail:
            <input type="text" value={this.state.email} onChange={(e) => { this.handleChange(e, 'email') }} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={(e) => { this.handleChange(e, 'password') }} />
          </label>
          <br />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

export default SignIn;