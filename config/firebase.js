// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-0zbdXjvH-sSSadZUoWonyRss8Wh1y0",
  authDomain: "newpota-adf00.firebaseapp.com",
  projectId: "newpota-adf00",
  storageBucket: "newpota-adf00.appspot.com",
  messagingSenderId: "514391001700",
  appId: "1:514391001700:web:458006502d6798211ced71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
