import React, { Component } from 'react';
import { db } from '../Firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
	textField: {
		width: '100%'
	},
	iconSmall: {
		fontSize: 20,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	button: {
		margin: '4px 0px',
		width: '100%'
	},
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class CarDocItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			comment: '',
			comments: this.props.dataProp.comments ? this.props.dataProp.comments : [] 
		};
	}

	componentDidMount = () => {
		let authObject = JSON.parse(localStorage.getItem('authUser'));
    let loggedInUserId = authObject.id;

    this.setState({
      loggedInUserId
    });
	}

	handleClickOpenDialog = () => {
		this.setState({ open: true });
	};

	handleCloseDialog = () => {
		this.setState({ open: false });
	};

	handleChangeInput = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	formatTime = (timestamp) => {
		const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

		let year = new Date(timestamp).getFullYear();
		let month = months[new Date(timestamp).getMonth()];
		let day = new Date(timestamp).getDate();

		return `${month} ${day}, ${year}`;
	}

	handleSaveComment = (e, carDocId) => {
		let previousComments = this.state.comments;

		if (this.state.comment) {
			db.saveCarDocumentComment(this.state.loggedInUserId, carDocId, this.state.comment).then(res => {
				previousComments.push(this.state.comment);

				this.setState({
					comments: previousComments,
					comment: ''
				})
			});
		}
	}

	render() {
		let { dataProp, classes } = this.props;

		return (
			<Grid item xs={6} className="item-grid">
				<div className="doc-item" style={{ backgroundImage: `url(${dataProp.imageUrl})` }} onClick={this.handleClickOpenDialog}>
					<div>{this.formatTime(dataProp.uploadTime)}</div>
				</div>

				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleCloseDialog}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" color="inherit" className={classes.flex}>
								Részletek
              </Typography>
							<IconButton color="inherit" onClick={this.handleCloseDialog} aria-label="Close">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<div className="dialog-img-container" style={{ backgroundImage: `url(${dataProp.imageUrl})` }}>
						<div>{this.formatTime(dataProp.uploadTime)}</div>
					</div>
					<div className="dialog-description-content">
						<TextField
							id="comment-input"
							label="Megjegyzés"
							className={classes.textField}
							value={this.state.comment}
							onChange={this.handleChangeInput('comment')}
							margin="normal"
						/>
						<div className="comment-save-btn-container">
							<Button variant="contained" size="small" className={classes.button} color="primary" onClick={(e) => { this.handleSaveComment(e, dataProp.id) }}>
								Mentés
							</Button>
						</div>
						<div className="car-doc-comments-container">
							<ul>
								{this.state.comments.map((comment, i) => {
									return <li key={i}>{comment}</li>
								})}
							</ul>
						</div>
					</div>
				</Dialog>
			</Grid>
		)
	}
}

CarDocItem.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarDocItem);