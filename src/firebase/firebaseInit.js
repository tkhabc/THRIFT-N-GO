// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {getFirestore, collection, getDoc, getDocs} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"
import { ref, onUnmounted } from 'vue'
import { getStorage } from "firebase/storage"


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
const storage = getStorage(firebase);
const itemsCollection = collection(db, 'items')

export default firebase
export {auth, storage, createUserWithEmailAndPassword, onAuthStateChanged, db, collection, getDoc, getDocs, signInWithEmailAndPassword, signOut}

export const createItem = item => {
  return itemsCollection.add(item)
}
export const getItem = async id => {
  const item = await itemsCollection.doc(id).get()
  return item.exists ? item.data() : null
}
export const updateItem = (id, item) => {
  return itemsCollection.doc(id).update(item)
}
export const deleteItem = id => {
  return itemsCollection.doc(id).delete()
}
export const useLoadUsers = () => {
  const items = ref([])
  const close = itemsCollection.onSnapshot(snapshot => {
    items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return items
}