import { db } from "../../config/firebase";
import { collection, doc, getDocs } from "firebase/firestore";

export const getProducts = () => async (dispatch) => {
  try {
    const data = await getDocs(collection(db, "offer"));
    const datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    console.log("-----");
    console.log(datas);

    dispatch({
      type: "GET_PRODUCTS",
      payload: datas,
    });
  } catch (error) {}
};
