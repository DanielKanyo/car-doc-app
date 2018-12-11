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

	formatTime = (timestamp) => {
		const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
		
		let year = new Date(timestamp).getFullYear();
		let month = months[new Date(timestamp).getMonth()];
		let day = new Date(timestamp).getDate();
		
		return `${month} ${day}, ${year}`;
	}

	render() {
		let { dataProp } = this.props;

		return (
			<Grid item xs={6} className="item-grid">
				<div className="doc-item" style={{ backgroundImage: `url(${dataProp.imageUrl})` }}>
					<div>{this.formatTime(dataProp.uploadTime)}</div>
				</div>
			</Grid>
		)
	}
}

CarDocItem.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarDocItem);