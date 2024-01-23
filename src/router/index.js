import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import About from '@/views/About.vue'
import Cart from '@/views/Cart.vue'
import Contact from '@/views/Contact.vue'
import FoodListing from '@/views/FoodListing.vue'
import ItemListing from '@/views/ItemListing.vue'
import AddFood from '@/views/AddFood.vue'
import AddItem from '@/views/AddItem.vue'
import UserLocation from '@/views/UserLocation.vue'
import ChatHistory from '@/views/ChatHistory.vue'
import ChatComponent from '@/components/ChatComponent.vue'
import EditItem from '@/components/EditItem.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/foodlisting',
    name: 'FoodListing',
    component: FoodListing
  },
  {
    path: '/itemlisting',
    name: 'ItemListing',
    component: ItemListing
  },
  {
    path: '/addfood',
    name: 'AddFood',
    component: AddFood
  },
  {
    path: '/additem',
    name: 'AddItem',
    component: AddItem
  },
  {
    path: '/userlocation',
    name: 'UserLocation',
    component: UserLocation
  },
  {
    path: '/chathistory',
    name: 'ChatHistory',
    component: ChatHistory
  },
  {
    path: '/chatcomponent',
    name: 'ChatComponent',
    component: ChatComponent
  },
  {
    path: '/edit-item/:itemId',
    name: 'EditItem',
    component: EditItem,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async(to , from , next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser){
      next()
    }
    else{
      alert("You must be logged in to see this page");
      next('/')
    }
  }
  else{
    next()
  }
})

// if(localStorage.getItem('jwt') == null){
//   next({
//     path: '/login',
//     params: { nextUrl: to.fullPath }
//   })
// }

export default router