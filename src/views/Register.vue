<template>
  <h1>Register now to reduce the food wastage in your area!</h1>
  <p v-if="loading">Registering, please wait...</p>
  <div v-else>
    <p class="form-email form">
      <label class="label-email">Your Email </label>
      <input type="email" placeholder="Email" @keydown.enter="login" v-model="email">
    </p>
    <p class="form-password form">
      <label class="label-password">Password </label>
      <input type="password" placeholder="Password" @keydown.enter="login" v-model="password">
    </p>
    <p><v-btn @click="register">Submit</v-btn></p>
    <p><v-btn @click="signInWithGoogle">signInWithGoogle</v-btn></p>
  </div>
</template>

<script setup>
import router from '@/router';
import {auth, createUserWithEmailAndPassword} from '@/firebase/firebaseInit'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {ref} from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const minPasswordLength = 8

const isValidEmail = () => emailRegex.test(email.value);
const isValidPassword = () => password.value.length >= minPasswordLength;

const handleAuthError = (error) => {
  console.error(error.code);
  let errorMessage = "An error occurred. Please try again.";

  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage = "This email is already in use. Please use a different email.";
      break;
    case 'auth/invalid-email':
      errorMessage = "Invalid email. Please enter a correct email.";
      break;
    case 'auth/weak-password':
      errorMessage = "Weak password. Please enter a stronger password.";
      break;
 
    default:
      errorMessage = error.message;
  }
  alert(error.message);
};

const register = () => {
  if (!isValidEmail()) {
    alert('Please enter a valid email address.');
    return;
  }
  else if (!isValidPassword()) {
    alert('Please enter a password with at least 8 characters.');
    return;
  }

  loading.value = true;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("Successfully registered!")
      console.log(auth.currentUser)
      router.push('/login')
    })
    .catch(handleAuthError)
    .finally(() => loading.value = false);
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log("Successfully logged in!")
    console.log(result.user)
    router.push('/foodlisting')
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
  });
}
</script>