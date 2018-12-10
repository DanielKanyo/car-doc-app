import {
  storage
} from './firebase';

export const uploadDocImage = (file) => {
  let storageRef = storage.ref(`images/${file.name}`);
  return storageRef.put(file);
}

export const getImageDownloadUrl = (fullPath) => {
  let storageRef = storage.ref(fullPath);

  return storageRef.getDownloadURL().then(function (url) {
    return url;
  });
}