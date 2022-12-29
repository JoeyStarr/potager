// Firebase
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getUser = async (uid) => {
  const usersRef = collection(db, "users");

  // Query
  const q = query(usersRef, where("uid", "==", uid));

  // Execute Query
  const querySnapshot = await getDocs(q);

  // Data
  let datas = null;
  if (querySnapshot.empty) {
    return null;
  } else {
    querySnapshot.forEach((doc) => {
      datas = doc.data();
      datas.docRef = doc.id;
    });
  }

  return datas;
};

export const getPotagerByHash = async (hash) => {
  const potagerRef = collection(db, "potager");

  // Query
  const q = query(potagerRef, where("hashPota", "==", hash));

  // Execute Query
  const querySnapshot = await getDocs(q);

  // Data
  let datas = null;
  if (querySnapshot.empty) {
    return null;
  } else {
    querySnapshot.forEach((doc) => {
      datas = doc.data();
      datas.potagerRef = doc.id;
    });
  }

  return datas;
};

export const setHashPota = async (documentID, hashPota, potagerId, userUID) => {
  const userRef = doc(db, "users", documentID);
  const potagerRef = doc(db, "potager", potagerId);

  await updateDoc(userRef, {
    hashPota: hashPota,
  });

  await updateDoc(potagerRef, {
    owner: userUID,
  });
};
