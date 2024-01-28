import App from './App.vue'
import { createApp, reactive, provide } from 'vue'
import router from './router'
import {store} from './store'
import firebase from './firebase/firebaseInit'
import Vuex from 'vuex'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const globalState = reactive({
  userProfileCompleted: false,
});

const vuetify = createVuetify({
  components,
  directives,

  theme: {
    // Customize the theme here
    themes: {
      light: {
        primary: "#13538A",
        primaryDarker: "#0B3051",
        secondary: "#CBF4FF", 
        tertiary: "#2C92D5",
        accent: "#F87C34",
  },
    }
  },
})

createApp(App)
    .use(store)
    .use(router)
    .provide('globalState', globalState)
    .use(Vuex)
    .use(firebase)
    .use(vuetify)
    .mount('#app')
 