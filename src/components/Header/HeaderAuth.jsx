import React, { Component } from 'react';
import { Link } from "react-router-dom";
import withAuthorization from '../Session/withAuthorization';
import { auth } from '../Firebase';
import compose from 'recompose/compose';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 0,
  },
};

class HeaderAuth extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography component={Link} to="/carDoc" variant="h6" color="inherit" className={classes.grow}>
              CarDoc
            </Typography>
            <IconButton onClick={auth.doSignOut} className={classes.menuButton} color="inherit" aria-label="Menu">
              <LockIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition), withStyles(styles))(HeaderAuth);