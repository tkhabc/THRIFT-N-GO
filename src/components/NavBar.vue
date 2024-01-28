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
        v-for="item in filteredMenuItems" 
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

      <v-list-item v-if="isLoggedIn">   
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
import { ref, onMounted, computed, inject, watch } from 'vue';
import { auth, onAuthStateChanged, signOut } from '@/firebase/firebaseInit';
import UserServices from '@/firebase/userService' // Adjust the path as per your project structure
import router from '@/router';

const drawer = ref(false);
const isLoggedIn = ref(false);
const profile = ref(null);
const globalState = inject('globalState');

const menuItems = ref([
  { title: 'User Profile', path: '/myprofile', visibleTo: ['User', 'Food Seller'] },
  { title: 'Food Listing', path: '/foodlisting', visibleTo: ['User', 'Food Seller'] },
  { title: 'Item Listing', path: '/itemlisting', visibleTo: ['User'] },
  { title: 'Booking', path: '/booking', visibleTo: ['User'] },
  { title: 'Order Management', path: '/ordermanagement', visibleTo: ['User', 'Food Seller'] },
  { title: 'Chat History', path: '/chathistory', visibleTo: ['User', 'Food Seller'] },
  { title: 'Location', path: '/userlocation', visibleTo: ['User', 'Food Seller'] },
  { title: 'Contact Us', path: '/contact', visibleTo: ['User', 'Food Seller'] },
]);

const updateUserProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userData = await UserServices.getUserData(user.uid);
      profile.value = userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};

watch(() => globalState.userProfileCompleted, (newVal) => {
  if (newVal) {
    updateUserProfile();
  }
});

const filteredMenuItems = computed(() => {
  if (!globalState.userProfileCompleted || !profile.value) {
    return [];
  }
  return menuItems.value.filter(item => item.visibleTo.includes(profile.value.identity));
});

// Replace navigateToHome method
const navigateToHome = () => {
  router.push('/');
};

// Replace getActiveClass method
const getActiveClass = (path) => {
  return router.currentRoute.value.path === path ? 'active-item' : '';
};

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    isLoggedIn.value = !!user;
    if (user) {
      try {
        const userData = await UserServices.getUserData(user.uid);
        profile.value = userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
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