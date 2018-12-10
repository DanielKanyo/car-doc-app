import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';

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

class HeaderNonAuth extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              CarDoc
            </Typography>
            <IconButton component={Link} to="/signIn" className={classes.menuButton} color="inherit" aria-label="Menu">
              <LockOpenIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderNonAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderNonAuth);