<template>
  <div class="container">
    <header class="orders-header">
      <h1 class="section-title">YOUR ORDERS</h1>
    </header>
    <main class="main-content">
      <section class="your-orders">
        <div v-for="item in cartItems" :key="item.id" class="order-item">
          <div class="item-description">
            <h2 class="item-name">{{ item.name }}</h2>
            <div class="price">RM{{ item.price }}</div>
          </div>
          <v-btn class="delete-btn" @click="removeFromCart(index)">Remove</v-btn>
        </div>
        <div v-if="cartItems.length === 0" class="empty-cart">
          No items in the cart.
        </div>
      </section>
      <!-- <section class="payment-methods">
        <h2 class="section-title">Payment Methods</h2>
        <div class="payment-logos">
          <img src="../assets/visa.png" alt="Visa">
          <img src="../assets/mastercard.png" alt="Mastercard">
          <img src="../assets/fpx.png" alt="FPX">
          <img src="../assets/tng.png" alt="Touch 'n Go">
        </div>
      </section> -->
    </main>
    <!-- <div class="checkout-container">
      <v-btn class="checkout-btn">Checkout</v-btn>
    </div> -->

    <footer class="order-summary">
      <h2 class="section-title-2">Order Summary</h2>
      <div class="summary-details">{{ itemCount }} items</div>
      <div class="summary-total">Total RM{{ totalPrice }}</div>
    </footer>
  </div>
</template>

<script>
import { db } from '@/firebase/firebaseInit'
import { collection, query, getDocs, onSnapshot,doc,deleteDoc,addDoc } from 'firebase/firestore'
import { cartStore } from '@/cartStore';

export default {
  name: 'Cart',
  computed: {
    cartItems() {
      return cartStore.items;
    },
    itemCount() {
      return cartStore.items.length;
    },
    totalPrice() {
    return cartStore.items.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  }
  },

  // data() {
  //   return {
  //    //cartItems: []
  //   };
  // },

  methods: {removeFromCart(index) {
      cartStore.removeFromCart(index);
    }},
  
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

<style scoped>
.container {
  font-family: 'Roboto', sans-serif;
  width: 95%; /* Full width */
  max-width: 600px; /* Maximum width */
  margin: 0 auto; /* Center container */
  padding: 0; /* Remove padding */
  display: flex;
  flex-direction: column;
  height: 92vh; /* Full viewport height */
  margin-top: 10px;
  background-color: #FFFFFF;
}

.orders-header {
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-bottom: 1px solid #eaeaea; /* Line at the bottom */
}

/* Now we will remove margin and shadow from the first order item
   since the shadow is provided by the header */
.order-item:first-of-type {
  margin-top: 0;
  box-shadow: none;
}

.main-content {
  overflow-y: auto;
  flex-grow: 1; /* Ensures it takes up all available space */
}

.section-title {
  font-family: 'Roboto', sans-serif;
  color: #000000;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
}

.section-title-2 {
  font-family: 'Roboto', sans-serif;
  color: #000000;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: left;
}

.your-orders {
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  width: 100%; /* Set width to 100% for maximum width */
}

.item-name {
  font-size: 18px;
  font-weight: 1000;
  color: #000000;
  text-align: left;
}

.price {
  font-size: 15px;
  font-weight: 400;
  color: #616161;
  text-align: left;
}

.delete-btn {
  background-color: #1DE9B6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  white-space: nowrap; /* Prevent button text from wrapping */
}

.empty-cart {
  text-align: left;
  padding: 20px;
  font-style: italic;
}

.order-summary {
  padding: 15px 20px; /* Adjust padding as needed */
  background-color: #FFFFFF;
  border-top: 3px solid #eaeaea;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.05); /* Optional shadow for depth */
}

.summary-details {
  font-size: 16px;
  margin: 10px 0;
  text-align: left;
}

.summary-total {
  font-weight: bold;
  color: #F44336;
  font-size: 16px;
  margin: 5px 0;
  margin-top: 10px; 
  text-align: left;
}

@media (max-width: 768px) {
  /* ... existing media query styles ... */
  
  .order-summary {
    position: static; /* On smaller screens, the summary is not fixed */
  }

  .main-content {
    padding-bottom: 0; /* No need for extra padding when the summary is not fixed */
  }
}

/* .payment-logos {
  display: flex;
  justify-content: space-around;
  text-align: left;
}

.payment-logos img {
  height: 30px;
} */

/* .checkout-container {
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: flex-start;
}

.checkout-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.checkout-btn:hover {
  background-color: #0056b3;
} */
</style>


