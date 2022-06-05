import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC2D4Pp03b7c698Xg6MyOb-tOvGVGTzdls",

  authDomain: "mascotas-perdidas-7a575.firebaseapp.com",

  projectId: "mascotas-perdidas-7a575",

  storageBucket: "mascotas-perdidas-7a575.appspot.com",

  messagingSenderId: "944335295751",

  appId: "1:944335295751:web:10881d53ea8d970c2821a2",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = new getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = new getStorage(app);
