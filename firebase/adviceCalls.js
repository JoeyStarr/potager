// Firebase
import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../config/firebase";

const storage = getStorage();

export const getAllAdvices = async (uid) => {
  const advices = collection(db, "advices");

  const q = query(advices);
  const querySnapshot = await getDocs(q);

  let datas = [];
  querySnapshot.forEach((doc) => {
    const newData = { ...doc.data(), ref: doc.id };
    datas.push(newData);
  });

  return datas;
};

export const incAdviceCount = async (adviceID, count) => {
  const adviceRef = doc(db, "advices", adviceID);

  await updateDoc(adviceRef, {
    countHear: count + 1,
  });
};

export const uploadImage = async (blobFile, fileName) => {
  return new Promise((resolve, reject) => {
    if (!blobFile) return;
    const storageRef = ref(storage, `advices/${fileName}`); //LINE A
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

export const uploadAudio = async (blobFile, fileName) => {
  return new Promise((resolve, reject) => {
    if (!blobFile) return;
    const sotrageRef = ref(storage, `advices/${fileName}`); //LINE A
    const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
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

export const addAdvice = async (advice) => {
  try {
    const docRef = await addDoc(collection(db, "advices"), advice);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAdvice = async (adviceRef, imageName, soundName) => {
  try {
    // Create a reference to the file to delete
    const imageRef = ref(storage, "advices/" + imageName);
    const soundRef = ref(storage, "advices/" + soundName);

    // Delete the file
    await deleteObject(imageRef);
    await deleteObject(soundRef).then(() => {
      deleteDoc(doc(db, "advices", adviceRef));
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};
