import { db } from "../../config/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const getProducts = () => async (dispatch) => {
  try {
    const data = await getDocs(collection(db, "offer"));
    const datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    var finalDatas = [];

    // Seller
    datas.forEach(async (product) => {
      const usersRef = collection(db, "users");
      // Query
      const q = query(usersRef, where("uid", "==", product.idSeller));

      // Execute Query
      const querySnapshot = await getDocs(q);

      // Data
      let newProduct;
      if (querySnapshot.empty) {
        return null;
      } else {
        querySnapshot.forEach((doc) => {
          newProduct = { ...product, nameSeller: doc.data().name };
        });
      }
      finalDatas.push(newProduct);
    });

    dispatch({
      type: "GET_PRODUCTS",
      payload: finalDatas,
    });
  } catch (error) {}
};
