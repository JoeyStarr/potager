import * as React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = React.useState();
  const [admin, setAdmin] = React.useState(null);

  const getAdmin = async (uid) => {
    const adminRef = collection(db, "admin");

    // Query
    const q = query(adminRef, where("uidAdmin", "==", uid));

    // Execute Query
    const querySnapshot = await getDocs(q);

    // Data
    let datas = null;
    querySnapshot.forEach((doc) => {
      datas = doc.data();
    });
    return datas;
  };

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          await getAdmin(uid).then((data) => {
            if (data?.defcon) {
              setAdmin(data);
            } else setAdmin(null);
          });

          setUser(user);
          // ...
        } else {
          // User is signed out
          // ...
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStateChanged;
  }, []);

  return { user, admin };
};
