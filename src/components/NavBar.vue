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
      { title: 'UserProfile', path: '/userprofile' },
      { title: 'Food Listing', path: '/foodlisting' },
      { title: 'Item Listing', path: '/itemlisting' },
      { title: 'Booking', path: '/booking' },
      { title: 'Contact', path: '/contact' },
      { title: 'UserLocation', path: '/userlocation' },
      { title: 'ChatHistory', path: '/chathistory' },
      { title: 'ChatList', path: '/chatlist' },
      { title: 'Chat Testing', path: '/chattesting' },
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
  background-color: #E0E0E0 !important;
}
</style>
