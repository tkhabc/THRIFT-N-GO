// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {getFirestore, collection, getDoc, getDocs} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6S7aZW7uV16DrxD7YGjikYHCHI5XN_gQ",
  authDomain: "cat-project-vue.firebaseapp.com",
  databaseURL: "https://cat-project-vue-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cat-project-vue",
  storageBucket: "cat-project-vue.appspot.com",
  messagingSenderId: "126951284658",
  appId: "1:126951284658:web:16329353cf557ac8f60eab",
  measurementId: "G-7EK9307ZTM"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const analytics = getAnalytics(firebase);

export default firebase
export {auth, createUserWithEmailAndPassword, onAuthStateChanged, db, collection, getDoc, getDocs, signInWithEmailAndPassword, signOut}