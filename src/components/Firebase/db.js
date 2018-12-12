import {
  db
} from './firebase';

export const user = id => db.ref(`users/${id}`);

export const addCarDocument = (id, url, imageName) => {
  let carDocsRef = db.ref(`users/${id}/carDocs`);
  let carDocRef = carDocsRef.push();

  carDocRef.set({
    imageUrl: url,
    imageName,
    uploadTime: new Date().getTime()
  });

  return carDocRef;
}

export const saveCarDocumentComment = (userId, carDocId, comment) => {
  let carDocsCommentsRef = db.ref(`users/${userId}/carDocs/${carDocId}/comments`);
  let carDocsCommentRef = carDocsCommentsRef.push();

  carDocsCommentRef.set({
    comment
  });

  return carDocsCommentRef;
}

export const getCarDocument = (id) => {
  return db.ref(`users/${id}/carDocs`).once('value').then(function (snap) {
    return snap.val();
  });
}

export const deleteCarDocument = (userId, carDocId) => {
  let carDocRef = db.ref(`users/${userId}/carDocs/${carDocId}`);
  carDocRef.remove();
}

export const deleteCarDocumentComment = (userId, carDocId, commentId) => {
  let commentRef = db.ref(`users/${userId}/carDocs/${carDocId}/comments/${commentId}`);
  commentRef.remove();
}