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


<script setup>
import { ref, onMounted } from 'vue';
import { auth, onAuthStateChanged, signOut } from '@/firebase/firebaseInit';
import router from '@/router';

const drawer = ref(false);
const isLoggedIn = ref(false);

const menuItems = ref([
  { title: 'UserProfile', path: '/myprofile' },
  { title: 'Food Listing', path: '/foodlisting' },
  { title: 'Item Listing', path: '/itemlisting' },
  { title: 'Booking', path: '/booking' },
  { title: 'Chat History', path: '/chathistory' },
  { title: 'UserLocation', path: '/userlocation' },
  { title: 'Contact Us', path: '/contact' },
  { title: 'Order Management', path: '/ordermanagement' },
]);

// Replace navigateToHome method
const navigateToHome = () => {
  router.push('/');
};

// Replace getActiveClass method
const getActiveClass = (path) => {
  return router.currentRoute.value.path === path ? 'active-item' : '';
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out!");
    router.push('/login');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};
</script>