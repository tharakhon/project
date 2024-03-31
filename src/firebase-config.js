// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getAuth, GoogleAuthProvider} from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZor1_2_l5QuFmoki5R86GxqYfp3Fbx3I",
  authDomain: "test2-a0aaf.firebaseapp.com",
  projectId: "test2-a0aaf",
  storageBucket: "test2-a0aaf.appspot.com",
  messagingSenderId: "182481717417",
  appId: "1:182481717417:web:5d570297755b8a31fc81b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);