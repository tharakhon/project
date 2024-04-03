// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getAuth, GoogleAuthProvider} from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY1StdxOxpo0sizvMFoQh1L_l_XmS8_58",
  authDomain: "chat-avb-8b327.firebaseapp.com",
  databaseURL: "https://chat-avb-8b327-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-avb-8b327",
  storageBucket: "chat-avb-8b327.appspot.com",
  messagingSenderId: "80306934545",
  appId: "1:80306934545:web:9c45f7a9cbe20c652cf2b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);