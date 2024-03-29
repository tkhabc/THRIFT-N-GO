<template>
  <v-app style="background: #FFFFFF">
    <GlobalMessage />
    <template v-if="!notSignedIn">
      <NavBar /> 
      <Cart :cartItems = "cart"></Cart>
      <ItemListing  @add-to-cart = "addToCart"></ItemListing>
    </template>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  import { inject } from 'vue';
  import NavBar from '@/components/NavBar.vue'
  import ItemListing from './views/ItemListing.vue';
  import Cart from './views/Booking.vue';
  import GlobalMessage from './components/GlobalMessage.vue';
  import {auth} from './firebase/firebaseInit';
  import UserServices from '@/firebase/userService'

  export default {
    name: 'App',
    components: {
    NavBar,
    GlobalMessage
  },

  setup() {
    const globalState = inject('globalState');
    return { globalState };
  },

  data() {
    return {
      showNavBar: true,
      cart: [] // Initialize cart as an empty array
    }
  },
  async mounted() {
    this.checkUserProfile();
  },
  watch: {
    '$route': function() {
      this.checkUserProfile();
    }
  },

  methods: {
    async checkUserProfile() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userProfile = await UserServices.getUserData(currentUser.uid);
        this.globalState.userProfileCompleted = userProfile.profileCompleted;
        this.showNavBar = userProfile.profileCompleted;
      } else {
        this.showNavBar = false;
      }
    },
    addToCart(item) {
      this.cart.push(item);
      console.log('Cart updated:', this.cart);
    }
  },

  computed: {
    notSignedIn() {
      return this.$route.path == '/login' || this.$route.path == '/register' || this.$route.path == '/'
    }
  }
}
</script>

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
  display: grid;
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

