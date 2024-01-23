<!-- <template>
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
</template> -->

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <img class="logo" alt="Thrift N Go Logo" src="../assets/ThriftNGoLogo.png">
      <v-container class="login-container">
        <v-card class="login-card" elevation="12">
          <v-card-title class="headline">Register Now To Reduce Wastage!</v-card-title>
          <v-card-text>
            <v-form>
              <p v-if="loading">Registering, please wait...</p>
              <div v-else>
                <v-text-field
                  label="Email"
                  required
                  type="email"
                  placeholder="Enter your email"
                  v-model="email"
                  @keydown.enter="register"
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  label="Password"
                  required
                  type="password"
                  placeholder="Enter your password"
                  v-model="password"
                  @keydown.enter="register"
                  outlined
                  dense
                ></v-text-field>

                <v-btn
                  color="teal-darken-2"
                  @click="register"
                  large
                  block
                  class="mb-2 text-bold"
                >Submit</v-btn>

                <v-btn
                  color="teal-lighten-1"
                  class="text-bold"
                  @click="signInWithGoogle"
                  large
                  block
                >
                  <img class="google-icon" alt="Google Logo" src="../assets/GoogleLogo.png"/>
                  Sign Up With Google
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

hiiii

<script setup>
import router from '@/router';
import {auth, createUserWithEmailAndPassword, db} from '@/firebase/firebaseInit'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {ref} from 'vue'

const storeUserInFirestore = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // User doesn't exist in Firestore, so create a new record
    await setDoc(userRef, {
      username: user.displayName || 'Anonymous', // Use Google display name
      email: user.email,
      // Add other relevant user info
    });
  }
};

// Example usage after successful Google sign-in
auth.onAuthStateChanged((user) => {
  if (user) {
    storeUserInFirestore(user);
  }
});

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

<style scoped>
.main-container {
  display: flex;
  flex-direction: column; /* Changed from center to column for vertical stacking */
  align-items: center;
  min-height: 100vh; /* Reduced min-height */
  background-color: #1A6757; /* Set the background color */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh; /* Negative margin to move up */
}

.logo {
  max-width: 80%; /* Adjust as necessary for your design */
  margin-bottom: 20px; /* Space between logo and form */
}
.login-card {
  width: 100%;
  max-width: 400px;
}

.headline {
  font-family: 'Roboto', sans-serif; /* This is an example; choose a font that fits your design */
  font-size: 1.3rem; /* Example size, adjust as needed */
  font-weight: bold;
  color: #000000; /* Choose a color that fits your design */
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */
  letter-spacing: 0.05em; /* Adjust as needed */
  margin-top: 10px; /* Adjust as needed */
  margin-bottom: 10px; /* Adjust as needed */
}

.error-message {
  color: red; /* Error message text color */
  text-align: center;
  margin-bottom: 16px; /* Space below the error message */
}

.mb-2 {
  margin-bottom: 16px; /* Adjust the value as needed for desired spacing */
}

.text-bold {
  font-weight: bold;
}

.google-icon {
  height: 20px; /* Height of the Google icon */
  width: 20px; /* Width of the Google icon */
  margin-right: 8px; /* Space between the icon and the text */
}

/* Style for the buttons */
.v-btn {
  font-size: 16px; /* Button text size */
  height: 48px; /* Button height, adjust if needed */
  margin-bottom: 8px; /* Space between buttons */
}

/* Custom style for the Google button text color */
.custom-text-color {
  color: black !important; /* Ensuring text color override */
}
</style>
