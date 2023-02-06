// Firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const uploadImage = async (blobFile, fileName) => {
  return new Promise((resolve, reject) => {
    if (!blobFile) return;
    const storageRef = ref(storage, `images/${fileName}`); //LINE A
    const uploadTask = uploadBytesResumable(storageRef, blobFile); //LINE B
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      null,
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //LINE C
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};
