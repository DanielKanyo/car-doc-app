import React, { Component } from 'react';
import { auth } from '../Firebase';
import { Link } from "react-router-dom";

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
    padding: '8px 16px 16px 16px'
  },
  textField: {
    marginTop: 10,
    width: '100%'
  },
  dense: {
    marginTop: 19,
  },
  button: {
    marginTop: 8,
    width: '100%'
  }
});

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
    const { classes } = this.props;

    return (
      <div className="component-content">
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.paper} elevation={1}>
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
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              Bejelentkezés
            </Button>
            <Button component={Link} to={"/signUp/"} className={classes.button} variant="contained" color="secondary">
              Regisztráció
            </Button>
          </Paper>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);