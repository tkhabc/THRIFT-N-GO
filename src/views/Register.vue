<template>
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
</template>

<script>
  //import axios from 'axios';
  export default {
    name: 'signup-form',
    data() {
      return{
        user: {
          username: '',
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
      signIn: function() {
        let user = {
          "user": {
            "username": this.user.username,
            "password": this.user.password
          } 
        }
        //this.$store.dispatch('signUserIn',user).then((e)=>e? this.$router.push('/login') : undefined);     
        this.$store.dispatch('signUserIn',user).then( ()=>{
        this.$router.push('/login')})                                       
      },
      clearErrors: function() {
        this.$store.dispatch('clearErrors');
      }
    }
  }
</script>