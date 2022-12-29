// Firebase
import { collection, query, where, getDocs } from "firebase/firestore";
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
      console.log(doc.id, "=>", doc.data());
      datas = doc.data();
    });
  }

  return datas;
};
