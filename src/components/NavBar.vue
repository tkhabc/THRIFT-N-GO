<template>       
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-img hover="click me" :src="require('@/assets/ThriftNGoLogo.png')" width="60" alt="Thrift N Go logo" style="cursor: pointer" @click="navigateToHome" />
    </template>

    <template v-slot:append>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>    
    
    <v-app-bar-title>THRIFT N GO</v-app-bar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer location="right" width="200" v-model="drawer">
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" @click="drawer = false">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.path">{{ item.title }}</router-link>
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
  }),
  methods: {
    navigateToHome() {
      this.$router.push('/');
    }
  }
};
</script>
