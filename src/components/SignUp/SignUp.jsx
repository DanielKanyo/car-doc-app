import React, { Component } from 'react';
import { auth, db } from '../Firebase';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      errorMsg: ''
    };
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = event => {
    const { name, email, password, errorMsg } = this.state;
    const { history } = this.props;

    auth.createUserWithEmailAndPassword(email, password).then(authenticatedUser => {
      db.user(authenticatedUser.user.uid, name, email).set({
        name,
        email
      }).then(() => {
        history.push('/carDoc');
      }).catch(error => {
        this.setState({ errorMsg });
      });
    });

    event.preventDefault();

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={(e) => { this.handleChange(e, 'name') }} />
          </label>
          <br />
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
          <label>
            Password again:
            <input type="password" value={this.state.passwordAgain} onChange={(e) => { this.handleChange(e, 'passwordAgain') }} />
          </label>
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;