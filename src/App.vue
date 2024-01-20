<template>
    <v-app style="background: linear-gradient(180deg, #FFFFFF 0%, #258744 100%); ">

    <br>
    <div></div>
    
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

    <v-app-bar app
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>

          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Thrift N Go</v-app-bar-title>

          <v-navigation-drawer app v-model="drawer">
            <v-list>
              <v-list-item app v-for="item in menuItems" :key="item.title" @click="drawer = false">
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link :to="item.path">{{ item.title }}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

          <!-- <router-view></router-view>  -->

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <router-view/>
         
    </v-app>

    <!-- <NavBar/> -->
    
</template>

<script>
  //import NavBar from '@/components/NavBar.vue'

  export default {
    name: 'App',
    components: {
      // NavBar
    },

    data: () => ({
    drawer: false,
    menuItems: [
      { title: 'Register', path: '/register' },
      { title: 'Login', path: '/login' },
      { title: 'Home', path: '/' },
      { title: 'About Us', path: '/about' },
      { title: 'Food Listing', path: '/foodlisting' },
      { title: 'Item Listing', path: '/itemlisting' },
      { title: 'Cart', path: '/cart' },
      { title: 'Contact', path: '/contact' },
      { title: 'Profile', path: '/profile' },
    ]
  })
}

</script>

<!-- import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
} -->

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

