<template>
  <div class="container">
    <main>
      <section class="your-orders">
        <h1>Your Ordershaha</h1>
        <!-- Repeat this block for each item in the cart -->
        <div v-for="item in cartItems" :key="item.id" class="order-item">
          
          <div class="item-description">
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
            <div class="price">Price: RM{{ item.price }}</div>
          </div>
          <v-btn color="red" @click="removeFromCart(index)">Delete</v-btn>

        </div>
        <div v-if="cartItems.length === 0">
         No items in the cart.
        </div>
        <!-- ... other items ... -->
      </section>

      <aside>

  <div class="order-summary">
    <h1>Order Summary</h1>
    <div>{{ itemCount }} items</div>
    <div>Total RM{{ totalPrice }}</div>
  </div>

  <div class="payment-methods">
    <h1>Payment Methods</h1>
    <div class="payment-logos">
      <img src="../assets/visa.png" alt="Visa">
      <img src="../assets/mastercard.png" alt="Mastercard">
      <img src="../assets/fpx.png" alt="FPX">
      <img src="../assets/tng.png" alt="Touch 'n Go">
    </div>
  </div>
</aside>
    </main>
  </div>
<div class="d-flex justify-center align-center">
  <v-btn variant="outlined">Checkout</v-btn>
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
  font-family: 'Arial', sans-serif;
  max-width: 90%; /* or 100% if you want it to be full width */
  margin: 0 auto;
  padding: 50px;
}

main {
  display: flex;
  justify-content: space-between;
}

.your-orders {
  width: 65%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin-right: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.order-item img {
  width: 80px; /* Adjust as needed */
  margin-right: 10px;
}

.item-description {
  flex-grow: 1;
}

.quantity,
.price {
  margin-left: auto;
}

aside {
  display: flex;
  flex-direction: column;
  width: 30%; /* This should match the width of your-orders if they are side by side */
  align-items: flex-start; /* Aligns children to the start of the container */
}

.order-summary {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
}

.payment-methods {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
}

.order-summary h1, .payment-methods h1 {
  margin-top: 0;
  margin-bottom: 15px;
  padding-left: 0;
  font-size: 1.5em; /* Adjust the font size as needed */
  text-align: left;
}

/* Ensure that the container divs have no additional padding or margin that could affect alignment */
.order-summary div, .payment-methods div {
  margin: 0;
  padding: 0;
}

/* Additional styles for payment logos */
.payment-logos {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.payment-logos img {
  height: 40px; /* Adjust the height to match the design */
  border-radius: 4px; /* Rounded corners for the images */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.checkout-button {
  display: block;
  width: auto; /* Adjust width to content or specify width that matches the .order-summary width */
  padding: 15px;
  border: none;
  border-radius: 30px;
  background-color: #1A6757;
  color: white;
  font-size: 18px;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.checkout-button:hover {
  background-color: #43C3A0;
}
</style>
