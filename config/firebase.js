// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3r-K8LSMJFJYnJKDzgiULQvIyuGC0K1g",
  authDomain: "pota-41600.firebaseapp.com",
  projectId: "pota-41600",
  storageBucket: "pota-41600.appspot.com",
  messagingSenderId: "79083343671",
  appId: "1:79083343671:web:9d1fafc1a0458630a9d4b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
