import React, { Component } from 'react';
import withAuthorization from '../Session/withAuthorization';
import compose from 'recompose/compose';
import { storage, db } from '../Firebase';

import CarDocItem from './CarDocItem';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

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
  fab: {
    margin: 4,
    color: 'white'
  }
});

class CarDoc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: '',
      docs: [],
      openSnack: false,
      file: '',
      uploadReady: false,
      snackMessage: ''
    };
  }

  componentDidMount = () => {
    let authObject = JSON.parse(localStorage.getItem('authUser'));
    let loggedInUserId = authObject.id;

    this.setState({
      loggedInUserId
    });
  }

  handleOpenSnack = () => {
    this.setState({ openSnack: true });
  };

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnack: false });
  };

  handleFileChange = (e) => {
    // max 10 MB
    const maxFileSize = 10485760;

    if (e.target.files.length) {
      let file = e.target.files[0];
      let fileType = file.type;

      if (fileType.includes("image") && file.size < maxFileSize) {
        this.setState({
          file,
          uploadReady: true
        });
      } else {
        if (file.size > maxFileSize) {
          this.setState({
            snackMessage: 'Túl nagy a kép mérete!'
          });

          this.handleOpenSnack();

        } else {
          this.setState({
            snackMessage: 'Csak képet tölthetsz fel!'
          });

          this.handleOpenSnack();
        }

        this.setState({
          file: '',
          uploadReady: false
        });
      }
    }
  }

  handleClearFileUpload = () => {
    this.setState({
      file: '',
      uploadReady: false
    });
  }

  saveItem = () => {
    let file = this.state.file;
    let previousDocs = this.state.docs;

    storage.uploadDocImage(file).then(fileObject => {
      let fullPath = fileObject.metadata.fullPath;
      storage.getImageDownloadUrl(fullPath).then(url => {
        db.addCarDocument(this.state.loggedInUserId, url).then(carDocRef => {
          let data = {
            userId: this.state.loggedInUserId,
            url
          }

          previousDocs.unshift(
            <CarDocItem
              key={carDocRef.key}
              dataProp={data}
            />
          )

          this.setState({
            docs: previousDocs,
            file: '',
            uploadReady: false,
            snackMessage: 'Sikeres mentés'
          });

          this.handleOpenSnack();

        });
      });
    });
  }

  render() {
    const { classes } = this.props;
    let { docs } = this.state;

    return (
      <div className="component-content">
        <Grid container className={classes.root} spacing={8}>
          {
            docs.map((doc) => {
              return doc;
            })
          }

          <Grid item xs={6}>
            <div className="new-item">
              <div className="add-icon">
                {!this.state.uploadReady ? <AddIcon /> : ''}
              </div>
              <div className="file-upload-container">
                <input type="file" onChange={(e) => this.handleFileChange(e)} />
              </div>
              {this.state.uploadReady ?
                <div className="save-or-clear-container">
                  <Fab aria-label="Delete" className={classes.fab} size="small" color="secondary" onClick={this.handleClearFileUpload}>
                    <ClearIcon />
                  </Fab>
                  <Fab aria-label="Delete" className={classes.fab} size="small" color="primary" onClick={this.saveItem}>
                    <SaveIcon />
                  </Fab>
                </div> : ''}
            </div>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnack}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

CarDoc.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withAuthorization(authCondition), withStyles(styles))(CarDoc);