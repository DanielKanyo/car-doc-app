import React, { Component } from 'react';
import { auth, db } from '../Firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: '8px 16px'
  },
  textField: {
    marginTop: 10,
    width: '100%'
  },
  dense: {
    marginTop: 19,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  }
});
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
    const { name, email, password } = this.state;
    const { history } = this.props;

    auth.createUserWithEmailAndPassword(email, password).then(authenticatedUser => {
      db.user(authenticatedUser.user.uid, name, email).set({
        name,
        email
      }).then(() => {
        history.push('/carDoc');
      }).catch(errorMsg => {
        this.setState({ errorMsg });
      });
    }).catch(errorMsg => {
      this.setState({ errorMsg });
    });

    event.preventDefault();

  }

  render() {
    const { classes } = this.props;
    const { name, email, password, passwordAgain, errorMsg } = this.state;

    const disable =
      password !== passwordAgain ||
      password === '' ||
      name === '' ||
      email === '';

    return (
      <div className="component-content">
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.paper} elevation={1}>
            <TextField
              id="name-textfield"
              label="Név"
              className={classes.textField}
              value={this.state.name}
              onChange={(e) => { this.handleChange(e, 'name') }}
              margin="normal"
            />
            <TextField
              id="email-textfield"
              label="E-mail"
              className={classes.textField}
              value={this.state.email}
              onChange={(e) => { this.handleChange(e, 'email') }}
              margin="normal"
            />
            <TextField
              id="password-textfield"
              label="Jelszó"
              className={classes.textField}
              value={this.state.password}
              onChange={(e) => { this.handleChange(e, 'password') }}
              margin="normal"
              type="password"
            />
            <TextField
              id="password-again-textfield"
              label="Jelszó mégegyszer"
              className={classes.textField}
              value={this.state.passwordAgain}
              onChange={(e) => { this.handleChange(e, 'passwordAgain') }}
              margin="normal"
              type="password"
            />
            <Button disabled={disable} className={classes.button} variant="contained" color="primary" type="submit">
              Regisztrálok
            </Button>
            {errorMsg && <p>{errorMsg.message}</p>}
          </Paper>
        </form>
      </div>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);