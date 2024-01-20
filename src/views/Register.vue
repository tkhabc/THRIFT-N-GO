<!-- <template>
  <div class="auth-form">
    <div class="auth-inner-wrapper">
      <h1> Register now to reduce the food wastage in your area!</h1>
      <ul id="error-list">
        <li class="error-msg">
          {{errors}}
        </li>
      </ul>
      <div class="form-name form">
        <label class="label-username">Your Username </label>
        <input type="text" placeholder="Name" @keydown.enter="login" v-model="user.username">
      </div>
      <div class="form-password form">
        <label class="label-password">Password </label>
        <input type="text" placeholder="Password" @keydown.enter="login" v-model="user.password">
        <div class="pw-submit">
          <input type="password" @keydown.enter="login" v-model="user.password">
          <button v-on:click="signIn">SIGN UP</button>
        </div>
      </div>
       <p class="account-prompt">Already have account?
        <router-link v-on:click="clearErrors" to="/login">Click Here</router-link> to log in!
      </p>
    </div>
  </div>
</template> -->

<template>
  <h1>Register now to reduce the food wastage in your area!</h1>
  <p class="form-email form">
        <label class="label-email">Your Email </label>
        <input type="email" placeholder="Email" @keydown.enter="login" v-model="email">
  </p>
  <p class="form-password form">
    <label class="label-password">Password </label>
    <input type="password" placeholder="Password" @keydown.enter="login" v-model="password">
  </p>

  <p><v-btn @click="register">Submit</v-btn></p>
  <p><v-btn @click="register">Submit</v-btn></p>
  <p><v-btn @click="signInWithGoogle">signInWithGoogle</v-btn></p>
</template>

<script setup>
import router from '@/router';
import {auth, createUserWithEmailAndPassword} from '@/firebase/firebaseInit'
import {ref} from 'vue';

const email = ref('');
const password = ref('');
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    console.log("Successfully registered!")
    console.log(auth.currentUser)
    router.push('/login')
    //const user = userCredential.user;  
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log("Error registering: " + errorMessage)
  });
}
const signInWithGoogle = () => {

}


  //import axios from 'axios';

  // export default {
  //   name: 'signup-form',
  //   data() {
  //     return{
  //       user: {
  //         username: '',
  //         password: ''
  //       }
  //     }
  //   },
  //   computed:{
  //     errors () {
  //       return this.$store.getters.errors
  //     }
  //   },
  //   methods:{
  //     signIn: function() {
  //       let user = {
  //         "user": {
  //           "username": this.user.username,
  //           "password": this.user.password
  //         } 
  //       }
  //       //this.$store.dispatch('signUserIn',user).then((e)=>e? this.$router.push('/login') : undefined);     
  //       this.$store.dispatch('signUserIn',user).then( ()=>{
  //       this.$router.push('/login')})                                       
  //     },
  //     clearErrors: function() {
  //       this.$store.dispatch('clearErrors');
  //     }
  //   }
  // }
</script>