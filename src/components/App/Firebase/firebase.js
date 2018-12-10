import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  db,
  auth,
  storage,
};