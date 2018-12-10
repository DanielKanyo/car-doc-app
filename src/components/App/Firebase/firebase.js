import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyD3a5nGPmrl1S6kdVIH04JpiP4q_W8pLqE",
  authDomain: "car-doc-app-bd321.firebaseapp.com",
  databaseURL: "https://car-doc-app-bd321.firebaseio.com",
  projectId: "car-doc-app-bd321",
  storageBucket: "",
  messagingSenderId: "521507691602"
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