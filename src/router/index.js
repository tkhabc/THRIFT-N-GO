import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
//import About from '@/views/About.vue'
import Cart from '../views/Cart.vue'
import Contact from '../views/Contact.vue'
import FoodListing from '../views/FoodListing.vue'
import ItemListing from '../views/ItemListing.vue'
import AddFood from '../views/AddFood.vue'
import AddItem from '../views/AddItem.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router