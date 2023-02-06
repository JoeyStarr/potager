// Firebase
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { db } from "../config/firebase";

const storage = getStorage();

export const getAllHashes = async (uid) => {
  const advices = collection(db, "potager");
  const q = query(advices);
  const querySnapshot = await getDocs(q);

  let datas = [];
  let hashes = [];
  querySnapshot.forEach((doc) => {
    const newData = { ...doc.data(), ref: doc.id };
    datas.push(newData);
  });

  datas.forEach((data) => {
    if (data?.hashPota) {
      hashes.push(data?.hashPota);
    }
  });
  return hashes;
};

export const deletePotager = async (potagerRef) => {
  try {
    await deleteDoc(doc(db, "potager", potagerRef));
  } catch (error) {
    console.error(error);
  }
};
