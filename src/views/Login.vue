<!-- <template>
  <h1>Log In And Start To Thrift N Go!</h1>
  <p class="form-email form">
        <label class="label-email">Your Email </label>
        <input type="email" placeholder="Email" @keydown.enter="login" v-model="email">
  </p>
  <p class="form-password form">
    <label class="label-password">Password </label>
    <input type="password" placeholder="Password" @keydown.enter="login" v-model="password">
  </p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><v-btn @click="register">Submit</v-btn></p>
  <p><v-btn @click="signInWithGoogle">signInWithGoogle</v-btn></p>
</template> -->

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <img class="logo" alt="Thrift N Go Logo" src="../assets/ThriftNGoLogo.png">
      <v-container class="login-container">
        <v-card class="login-card" elevation="12">
          <v-card-title class="headline">Log In And Start To Thrift N Go!</v-card-title>
          <v-card-text>
            <v-form>
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
            color="primary"
            @click="register"
            large
            block
          >Submit</v-btn>

          <v-btn
            color="secondary"
            @click="signInWithGoogle"
            large
            block
          >Sign In With Google</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</div>
</div>
</template>


<script setup>
import router from '@/router';
import {auth, signInWithEmailAndPassword} from '@/firebase/firebaseInit'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {ref} from 'vue';

const email = ref('');
const password = ref('');
const errMsg =ref();
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
  text-align: center;
}

.error-message {
  color: red;
  text-align: center;
}
</style>



<!-- <template>
  <div class="auth-form">
    <div class="auth-inner-wrapper">
      <img id="hero-image" src="https://res.cloudinary.com/eventbike/image/upload/c_scale,w_5760/v1517156084/leone-venter-469710_syofmw.jpg"/>
      <div class="login-form">
        <h1>Welcome to ThriftNGo</h1>
        <h2>Log in to get started</h2>
        <ul id="error-list">
          <li class="error-msg">
            {{errors}}
          </li>
        </ul>
        <div class="form-name form">
          <label class="label label-name">Username </label>
          <input class="input" type="text" v-on:keyup="clearErrors" @keydown.enter="login" v-model="user.organization_name">
        </div>
        <div class="form-password form">
          <label class="label label-password">Password </label>
          <div class="pw-submit">
            <input class="input" type="password" v-on:keyup="clearErrors" @keydown.enter="login" v-model="user.password">
            <button class="button is-primary" v-on:click="login">LOG IN</button>    
          </div>
        </div>
        <div id="signup-button">
          <p class="account-prompt">Don't have an account?
            <router-link v-on:click="clearErrors" to="/register">Click Here</router-link> to create one!
          </p> 
        </div>
      </div>
    </div>
  </div>  
</template> -->

<!-- <script>
 //import axios from 'axios';
  export default {
    emits: ['close'],

    name: 'login-form',
    data() {
      return{
        user: {
          organization_name: '',
          password: ''
        }
      }
    },
    computed:{
      errors () {
        return this.$store.getters.errors
      }
    },
    methods:{
      login: function() {
        let user = {
          "user": {
            "organization_name": this.user.organization_name,
            "password": this.user.password
          } 
        }
        this.$store.dispatch('logCurrentUserIn',user).then( ()=>{
        this.$router.push('/')})
      },
      clearErrors: function() {
        this.$store.dispatch('clearErrors');
      }
    },
  }
</script> -->