
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
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
