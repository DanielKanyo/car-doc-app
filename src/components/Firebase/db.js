import {
  db
} from './firebase';

export const user = id => db.ref(`users/${id}`);