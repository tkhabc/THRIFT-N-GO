<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="orders-header">
          <h1 class="section-title">YOUR BOOKINGS</h1>
        </header>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-card class="mb-3" v-for="(item, index) in cartItems" :key="item.id">
          <v-card-title>
            <v-icon left>mdi-cart</v-icon>
            {{ item.name }}
          </v-card-title>
          <v-card-text>
            <div>Price: RM{{ item.price }} x {{ item.quantity }}</div>
            <div>Time left: {{ calculateRemainingTime(item.addedAt) }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="removeFromCart(index)">Remove</v-btn>
          </v-card-actions>
        </v-card>
        <div v-if="cartItems.length === 0" class="empty-cart">You did not book any food or item.</div>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col cols="12" md="4">
        <v-card color="grey lighten-3">
          <v-card-title>Booking Summary</v-card-title>
          <v-card-text>
            <div>{{ itemCount }} items</div>
            <div>Total: RM{{ totalPrice }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { db } from '@/firebase/firebaseInit'
import { collection, query, getDocs, onSnapshot,doc,deleteDoc,addDoc } from 'firebase/firestore'
import { cartStore } from '@/cartStore';

export default {
  name: 'Booking',
  computed: {
    cartItems() {
      return cartStore.items;
    },
    itemCount() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  },
  totalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  },

  // data() {
  //   return {
  //    //cartItems: []
  //   };
  // },

  methods: {
    removeFromCart(index) {
      cartStore.removeFromCart(index);
      console.log("Item removed from cart:", index);
    },
  
  calculateRemainingTime(addedAt) {
      const now = Date.now();
      const duration = 30 * 60 * 1000; // 30 minutes in milliseconds
      const timeLeft = addedAt + duration - now;
      if (timeLeft <= 0) {
        return "Time's up";
      }
      return this.formatTime(timeLeft);
    },
    formatTime(milliseconds) {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    forceUpdate() {
    this.$forceUpdate(); // Force Vue to re-render the component
  },

beforeDestroy() {
  clearInterval(this.interval); // Clear the interval when the component is destroyed
}
  },
  mounted() {
  this.interval = setInterval(() => {
    this.forceUpdate(); // Method to force a component update
  }, 1000);
},
  
//     async deleteItem(documentId) {
//   const docRef = doc(db, 'cart', documentId);

//   try {
//     // Delete the document from Firestore
//     await deleteDoc(docRef);
//     console.log("Document deleted from cart:", documentId);

//     // Update the local cartItems array to reflect the deletion
//   this.cartItems = this.cartItems.filter(item => item.id !== documentId);
//   } catch (error) {
//     console.error("Error deleting document from cart: ", error);
//   }
// },
// async fetchCartItems() {
//   const cartCollectionRef = collection(db, 'cart');
//   try {
//     const querySnapshot = await getDocs(cartCollectionRef);
//     this.cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     console.log("Cart items fetched:", this.cartItems);
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//   }
// },

//   mounted() {
//     this.fetchCartItems();
//   },

//   // Optional: Clean up the listener when the component is destroyed
//   unmounted() {
//     if (this.unsubscribe) {
//       this.unsubscribe();
//     }
//   }
// }
// }
}
</script>

<style>
  .orders-header {
    padding: 5px;
    margin-bottom: 20px;
    text-align: center;
  }

  .section-title {
    font-size: 24px;
    font-weight: bold;
  }

  .empty-cart {
    text-align: center;
    padding: 20px;
    font-style: italic;
    color: grey;
  }
</style>

