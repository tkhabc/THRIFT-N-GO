<template>
    <!-- <div class="home">
      <img alt="Thrift N Go logo" width="100%" src="../assets/food.jpg">
    </div> -->
    <div class="unique-page-background">
      <span class="first-element">
    <img class="zoom-effect" alt="Thrift N Go Logo" width="100%" src="../assets/ThriftNGoLogo.png">
  </span>
  <div class="heading-text text-h6 color:white text-center font-weight-bold color-transition shake-on-hover">
    Save Our Earth By Thrifting and Sharing Unwanted Goods With The Community
  </div>
    <div>
    <v-btn @click="goToLogin" class="custom-btn" color="teal-lighten-1">Login</v-btn>
    </div>
    <div>
    <v-btn @click="goToRegister" class="custom-btn register-btn-container">Register Account</v-btn>
    </div>
    </div>
  </template>

<script setup>
  import router from '@/router';

  function goToLogin(){
    router.push('/login')
  }

  function goToRegister(){
    router.push('/register')
  }
</script>

<style>
.unique-page-background {
  background-color: #1A6757;
  min-height: 100vh; /* This makes the div at least the height of the viewport */
  width: 100%; /* This makes the div full width */
  margin: 0;
  padding: 0;
  display: flex; /* Enables Flexbox */
  flex-direction: column; /* Stack children vertically */
  justify-content: center; /* Center children vertically */
  align-items: center; /* Center children horizontally */
}

.first-element {
  margin-top: -100px; /* Adjust this value to move content upwards */
}

.heading-text {
  color: white; /* Make the text color white */
  margin-bottom: 30px; /* Increase space between heading and buttons */
}

/* Ensure the body has no margin or padding */
body {
  margin: 0;
  padding: 0;
}

.custom-btn {
  width:300px; /* Adjust the width as needed */
}

.register-btn-container {
  margin-top: 10px; /* Adjust the space above the register button */
}

.zoom-effect {
  transition: transform 0.5s ease; /* Smooth transition for the transform */
}

.zoom-effect:hover {
  transform: scale(1.1); /* Enlarge the image to 110% of its original size on hover */
  /* Change the scale value to adjust the zoom level */
}

.color-transition {
  transition: color 0.3s ease;
}

.color-transition:hover {
  color: #FFFF00; /* Change color on hover */

}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

.shake-on-hover:hover {
  animation: shake 0.5s; /* Adjust duration as needed */
  animation-iteration-count: infinite;
}

</style>