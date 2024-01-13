// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6S7aZW7uV16DrxD7YGjikYHCHI5XN_gQ",
  authDomain: "cat-project-vue.firebaseapp.com",
  projectId: "cat-project-vue",
  storageBucket: "cat-project-vue.appspot.com",
  messagingSenderId: "126951284658",
  appId: "1:126951284658:web:4fd65cd74c27099df60eab",
  measurementId: "G-V9N27K8S3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);