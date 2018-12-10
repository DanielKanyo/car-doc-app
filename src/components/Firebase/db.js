import {
  db
} from './firebase';

export const user = id => db.ref(`users/${id}`);

export const addCarDocument = (id, url) => {
  let carDocsRef = db.ref(`carDocs`);
  let carDocRef = carDocsRef.push();

  carDocRef.set({
    userId: id,
    imageUrl: url
  });
  
  return carDocRef;
}