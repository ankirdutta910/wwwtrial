import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoiXHxMG_vZPHz0eeJj5s661xhfU-Y4_4",
  authDomain: "members-76725.firebaseapp.com",
  databaseURL: "https://members-76725-default-rtdb.firebaseio.com",
  projectId: "members-76725",
  storageBucket: "members-76725.appspot.com",
  messagingSenderId: "734645197873",
  appId: "1:734645197873:web:808127fdb4d643d4d24910",
  measurementId: "G-7LYZ3R48GT",
});

// Initialize Firebase
var db = firebaseApp.firestore();
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export { db };
