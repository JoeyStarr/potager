// Firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCommandsBySeller = async (idSeller) => {
  try {
    const commandRefs = collection(db, "command");

    // Query
    const q = query(commandRefs, where("idSeller", "==", idSeller));

    // Execute Query
    const querySnapshot = await getDocs(q);

    // Data
    let datas = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      datas.push(doc.data());
    });

    return datas;
  } catch (error) {
    console.log(error);
  }
};
