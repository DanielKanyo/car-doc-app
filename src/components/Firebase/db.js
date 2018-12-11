import {
  db
} from './firebase';

export const user = id => db.ref(`users/${id}`);

export const addCarDocument = (id, url) => {
  let carDocsRef = db.ref(`users/${id}/carDocs`);
  let carDocRef = carDocsRef.push();

  carDocRef.set({
    imageUrl: url,
    uploadTime: new Date().getTime()
  });
  
  return carDocRef;
}

export const getCarDocument = (id) => {
  return db.ref(`users/${id}/carDocs`).once('value').then(function (snap) {
    return snap.val();
  });
}