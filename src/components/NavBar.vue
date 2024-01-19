<template>
  
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <!-- <v-app> -->
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
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Thrift N Go</v-app-bar-title>

          <v-navigation-drawer v-model="drawer">
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

          <!-- <router-view></router-view> -->

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
        <!-- </v-app> -->
      </v-layout>
  </v-card>
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
};
</script>
