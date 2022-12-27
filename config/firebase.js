// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT9L3mds7L4QbDLCQ0xlxehYlMAyjAkkY",
  authDomain: "potager-77cc3.firebaseapp.com",
  projectId: "potager-77cc3",
  storageBucket: "potager-77cc3.appspot.com",
  messagingSenderId: "130898531440",
  appId: "1:130898531440:web:ab793d78ca8f324f8d90b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
