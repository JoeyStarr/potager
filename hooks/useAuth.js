import * as React from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {user};
};
