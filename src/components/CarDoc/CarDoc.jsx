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
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
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
      snackMessage: '',
      loading: false,
      plusIcon: true,
    };
  }

  componentDidMount = () => {
    let authObject = JSON.parse(localStorage.getItem('authUser'));
    let loggedInUserId = authObject.id;
    let previousDocs = this.state.docs;

    this.setState({
      loggedInUserId
    });

    db.getCarDocument(loggedInUserId).then(carDocResponse => {

      for (let key in carDocResponse) {
        if (carDocResponse.hasOwnProperty(key)) {
          let carDoc = carDocResponse[key];

          let commentsArray = [];

          if (carDoc.comments) {

            for (let k in carDoc.comments) {
              let commentObj = {
                comment: carDoc.comments[k].comment,
                id: k
              }
              
              commentsArray.push(commentObj);
            }
          }

          let data = {
            imageUrl: carDoc.imageUrl,
            uploadTime: carDoc.uploadTime,
            imageName: carDoc.imageName,
            id: key,
            comments: commentsArray,
            docName: carDoc.docName
          }

          previousDocs.unshift(
            <CarDocItem
              key={key}
              dataProp={data}
              deleteItemProp={this.deleteItem}
              deleteCommentProp={this.deleteComment}
            />
          )
        }
      }

      this.setState({
        docs: previousDocs,
      });

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
          uploadReady: true,
          plusIcon: false
        });
      } else {
        if (file.size > maxFileSize) {
          this.setState({
            snackMessage: 'Túl nagy a kép mérete'
          });

          this.handleOpenSnack();

        } else {
          this.setState({
            snackMessage: 'Csak képet tölthetsz fel'
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
    this.setState({
      loading: true,
      uploadReady: false,
      plusIcon: false,
    });

    let file = this.state.file;
    let imageName = file.name;
    let docName = '';
    let previousDocs = this.state.docs;
    let uploadTime = new Date().getTime();
    let { loggedInUserId } = this.state;

    storage.uploadDocImage(file).then(fileObject => {
      let fullPath = fileObject.metadata.fullPath;

      storage.getImageDownloadUrl(fullPath).then(imageUrl => {
        db.addCarDocument(loggedInUserId, imageUrl, imageName, docName).then(carDocRef => {
          let data = {
            userId: loggedInUserId,
            imageUrl,
            uploadTime,
            imageName,
            id: carDocRef.key,
            docName
          }

          previousDocs.unshift(
            <CarDocItem
              key={carDocRef.key}
              dataProp={data}
              deleteItemProp={this.deleteItem}
              deleteCommentProp={this.deleteComment}
            />
          )

          this.setState({
            docs: previousDocs,
            file: '',
            uploadReady: false,
            snackMessage: 'Dokumentum elmentve',
            loading: false,
            plusIcon: true,
          });

          this.handleOpenSnack();
        });
      });
    });
  }

  deleteItem = (carDocId, imageName) => {
    let { loggedInUserId } = this.state;
    let previousDocs = this.state.docs;

    db.deleteCarDocument(loggedInUserId, carDocId);
    storage.deleteImage(imageName);

    for (let i = 0; i < previousDocs.length; i++) {
      if (previousDocs[i].key === carDocId) {
        previousDocs.splice(i, 1);
      }
    }

    this.setState({
      docs: previousDocs,
      snackMessage: 'Dokumentum törölve',
    });

    this.handleOpenSnack();
  }

  deleteComment = (commentId, carDocId) => {
    db.deleteCarDocumentComment(this.state.loggedInUserId, carDocId, commentId);

    this.setState({
      snackMessage: 'Megjegyzés törölve',
    });

    this.handleOpenSnack();
  }

  render() {
    const { classes } = this.props;
    let { docs } = this.state;

    return (
      <div className="component-content">
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={6} className="item-grid">
            <div className="new-item">
              <div className="add-icon">
                {this.state.plusIcon ? <div><AddIcon /><div>Feltöltés</div></div> : ''}
              </div>
              <div className="file-upload-container">
                <input type="file" onChange={(e) => this.handleFileChange(e)} />
              </div>
              {
                this.state.uploadReady ?
                  <div className="save-or-clear-container">
                    <Fab aria-label="Delete" className={classes.fab} size="small" color="secondary" onClick={this.handleClearFileUpload}>
                      <ClearIcon />
                    </Fab>
                    <Fab aria-label="Delete" className={classes.fab} size="small" color="primary" onClick={this.saveItem}>
                      <DoneIcon />
                    </Fab>
                  </div> : ''
              }
              {
                this.state.loading ?
                  <div className="loading-container">
                    <CircularProgress className={classes.progress} />
                  </div> : ''
              }
            </div>
          </Grid>

          {
            docs.map((doc) => {
              return doc;
            })
          }
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={5000}
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