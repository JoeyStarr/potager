// Firebase
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
