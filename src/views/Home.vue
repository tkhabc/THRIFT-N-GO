<template>
    <!-- <div class="home">
      <img alt="Thrift N Go logo" width="100%" src="../assets/food.jpg">
    </div> -->
    <div class="unique-page-background">
    <img class="zoom-effect" alt="Thrift N Go Logo" width="100%" src="../assets/ThriftNGoLogo.png">
    <div>
    <v-btn @click="goToLogin" class="custom-btn" color="teal-lighten-1">Login</v-btn>
    </div>
    <div class="">
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
  margin-top: -50px; /* Adjust this value to move content upwards */
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

</style>