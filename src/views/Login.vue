<template>
  <div class="main-container">
    <div class="content-wrapper">
      <img class="logo" alt="Thrift N Go Logo" src="../assets/ThriftNGoLogo.png">
      <v-container class="login-container">
        <v-card class="login-card" elevation="12">
          <v-card-title class="headline">Log In And Start To Thrift N Go!</v-card-title>
          <v-card-text>
            <v-form>
          <div>
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

          <p v-if="errMsg" class="error-message">{{ errMsg }}</p>

          <v-btn
            color="teal-darken-2"
            @click="register"
            large
            block
            class="mb-2 text-bold"
          >Submit</v-btn>

          <v-btn
            color="teal-lighten-1"
            class="text-bold google-btn"
            @click="signInWithGoogle"
            large
            block
          >
            Sign In With Google
          </v-btn>

          <v-btn
            color="teal-darken-2"
            @click="goToRegister"
            large
            block
            class="mb-2 text-bold"
          >Haven't Registered?</v-btn>

        </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</div>
</div>
</template>

fddfdf

<script setup>
import router from '@/router';
import {auth, signInWithEmailAndPassword, db} from '@/firebase/firebaseInit'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {ref} from 'vue';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const storeUserInFirestore = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // User doesn't exist in Firestore, so create a new record
    await setDoc(userRef, {
      username: user.displayName || 'Anonymous', // Use Google display name
      email: user.email,
      profilePictureUrl: user.photoURL, 
      // Add other relevant user info
    }, { merge: true });
  }
};

// Example usage after successful Google sign-in
auth.onAuthStateChanged((user) => {
  if (user) {
    storeUserInFirestore(user);
  }
});

const email = ref('');
const password = ref('');
const errMsg =ref();

const goToRegister = () => {
  router.push('/register')
}

const register = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    console.log("Successfully logged in!")
    console.log(auth.currentUser)
    router.push('/foodlisting')
  })
  .catch((error) => {
    console.log(error.code);
    switch(error.code){
      case "auth/invalid-email":
        errMsg.value = "Invalid email address format.";
        break;
      case "auth/user-disabled":
        errMsg.value = "User corresponding to the given email has been disabled.";
        break;
      case "auth/user-not-found":
        errMsg.value = "There is no user corresponding to the given email.";
        break;
      case "auth/wrong-password":
        errMsg.value = "Password is invalid for the given email, or the account corresponding to the email does not have a password set.";
        break;
      default:
        errMsg.value = "Email or password is incorrect.";
    }
  });
}

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

  const googleLogo = require('@/assets/GoogleLogo.png');
}

</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1A6757; /* Set the background color */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -2vh; /* Negative margin to move up */
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
  color: red;
  text-align: center;
}

.mb-2 {
  margin-bottom: 16px; /* Adjust the value as needed for desired spacing */
}

.text-bold {
  font-weight: bold;
}

.google-btn {
  margin-bottom: 10px; /* Increased space after the button */
}
</style>
