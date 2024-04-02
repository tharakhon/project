// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getAuth, GoogleAuthProvider} from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG0bNlgX-JLShj9vJxc-DsORZkfyfO3PY",
  authDomain: "test6-ace7f.firebaseapp.com",
  projectId: "test6-ace7f",
  storageBucket: "test6-ace7f.appspot.com",
  messagingSenderId: "871437292927",
  appId: "1:871437292927:web:596b2897415e9d9d3ab64a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);