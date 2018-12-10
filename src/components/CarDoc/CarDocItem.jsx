import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing.unit * 2,
	},
});

class CarDocItem extends Component {
	render() {
		let { dataProp } = this.props;

		return (
			<Grid item xs={6}>
				<div className="doc-item" style={{ backgroundImage: `url(${dataProp.url})` }}></div>
			</Grid>
		)
	}
}

CarDocItem.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarDocItem);