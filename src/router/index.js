import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Booking from '@/views/Booking.vue'
import Contact from '@/views/Contact.vue'
import FoodListing from '@/views/FoodListing.vue'
import ItemListing from '@/views/ItemListing.vue'
import AddFood from '@/components/AddFood.vue'
import AddItem from '@/components/AddItem.vue'
import UserLocation from '@/views/UserLocation.vue'
import EditItem from '@/components/EditItem.vue'
import EditFood from '@/components/EditFood.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import ChatHistory from '@/views/ChatHistory.vue'
import UserProfile from '@/views/UserProfile.vue'
import OrderManagement from '@/views/OrderManagement.vue'
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
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
    path: '/edititem/:itemId',
    name: 'EditItem',
    component: EditItem,
    props: true
  },
  {
    path: '/editfood/:foodId',
    name: 'EditFood',
    component: EditFood,
    props: true
  },
  {
    path: '/chatroom/:chatroomId',
    name: 'ChatRoom',
    component: ChatRoom,
    props: true
  },
  {
    path: '/chathistory',
    name: 'ChatHistory',
    component: ChatHistory
  },
  {
    path: '/userprofile/:userId',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: UserProfile
  },
  {
    path: '/ordermanagement',
    name: 'OrderManagement',
    component: OrderManagement
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