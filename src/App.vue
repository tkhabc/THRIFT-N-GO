
<template>
    <div id="nav">
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About Us</router-link>
    <router-link to="/foodlisting">Food List</router-link>
    <router-link to="/itemlisting">Item List</router-link>
    <router-link to="/cart">Cart</router-link>
    <router-link to="/contact">Contact Us</router-link>
    <router-link to="/profile">Profile</router-link>
    </div>
    <router-view/>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<!-- <script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


/* Apply a reset to remove default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Style your navigation bar */
#nav {
  display: flex;
  justify-content: center; /* Center the menu items horizontally */
  background-color: #1A6757; /* Use the green color from the screenshot */
  padding: 10px 0; /* Add some padding at the top and bottom of the nav bar */
}

/* Style your router links */
#nav a {
  text-decoration: none; /* Remove the underline from links */
  color: white; /* Set text color to white */
  margin: 0 10px; /* Add some space between the links */
  padding: 10px 15px; /* Add some padding to increase the clickable area */
  transition: background-color 0.3s; /* Smooth background-color transition */
  border-radius: 4px; /* Slightly round the corners of the links */
}

/* Change background color on hover */
#nav a:hover {
  background-color: #43C3A0; /* A darker green color for hover state */
}

/* Style for the active link */
.router-link-exact-active {
  background-color: #43C3A0; /* A darker green color for the active link */
  color: white;
}
</style>

