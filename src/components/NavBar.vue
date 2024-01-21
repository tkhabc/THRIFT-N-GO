<template>       
  <v-app-bar
    :style="{ backgroundColor: '#1A6757' }" dark>
    
    <template v-slot:prepend>
      <v-img hover="click me" :src="require('@/assets/ThriftNGoLogo.png')" width="60" alt="Thrift N Go logo" style="cursor: pointer" @click="navigateToHome" />
    </template>

    <template v-slot:append>
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>    
    
    <v-app-bar-title :style="{ color: '#FFFFFF' }">THRIFT N GO</v-app-bar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <!-- <v-navigation-drawer location="right" width="0" v-model="drawer">
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" @click="drawer = false">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.path" class="black--text">{{ item.title }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- v-if="isLoggedIn" inside the button -->
        <!-- <v-list-item >  
          <v-list-item-content>
            <v-list-item-title>
              <v-btn @click="handleSignOut">Sign Out</v-btn>
            </v-list-item-title>
          </v-list-item-content>
         </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-navigation-drawer location="right" width="0" v-model="drawer">
    <v-list dense>
      <v-list-item 
        v-for="item in menuItems" 
        :key="item.title" 
        link 
        :to="item.path" 
        @click="drawer = false"
        :active-class="getActiveClass(item.path)"
        exact
      >
        <v-list-item-content>
          <v-list-item-title class="black--text">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- v-if="isLoggedIn" inside the button -->
      <v-list-item >  
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn @click="handleSignOut">Sign Out</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-navigation-drawer> 

</template>

<script>
export default {
  data: () => ({
    drawer: false,
    menuItems: [
      // { title: 'Register', path: '/register' },
      // { title: 'Login', path: '/login' },
      // { title: 'Home', path: '/' },
      { title: 'About Us', path: '/about' },
      { title: 'Food Listing', path: '/foodlisting' },
      { title: 'Item Listing', path: '/itemlisting' },
      { title: 'Orders', path: '/cart' },
      { title: 'Contact', path: '/contact' },
      { title: 'Profile', path: '/profile' },
      { title: 'UserLocation', path: '/userlocation' },
    ]
  }),
  methods: {
    navigateToHome() {
      this.$router.push('/');
    },

    getActiveClass(path) {
      return this.$route.path === path ? 'active-item' : '';
    }
  }
};
</script>

<script setup>
import {onMounted, ref} from 'vue'
import {auth, onAuthStateChanged, signOut} from '@/firebase/firebaseInit'
import router from '@/router'

const isLoggedIn = ref(false);

onMounted(() => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } 
    else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/login')
    console.log("Successfully signed out!")
  })
}

</script>

<style scoped>
.white--text {
  color: #FFFFFF !important; 
}
.black--text {
  color: #000000 !important;
}

.v-list-item.active-item:not(.v-list-item--disabled) {
  background-color: #43C3A0 !important;
}
</style>
