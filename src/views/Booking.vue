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
        <template v-for="item in filteredCartItems" :key="item.id">
          <v-card class="mb-3">
            <div 
              class="collection-method-label"
              :class="{ 'food-label': item.collectionMethod === 'shop', 'item-label': item.collectionMethod !== 'shop' }">
              {{ item.collectionMethod === 'shop' ? 'Food' : 'Item' }}
            </div>
            <v-card-title>
              <v-icon left>mdi-cart</v-icon>
              {{ item.name }}
            </v-card-title>
            <v-card-text>
              <div class="booking-item-image">
                <v-img 
                  :src="item.photos[0].url" 
                  height="100" 
                  cover 
                  @error="imageLoadError"
                ></v-img>
              </div>
              <div>
                <template v-if="item.price === '' || item.price === 0">
                  <span class="free-label">Free</span> x {{ item.bookedItem }}
                </template>
                <template v-else>
                  RM{{ item.price }} x {{ item.bookedItem }}
                </template>
              </div>
              <div v-if="item.collectionMethod === 'shop'">
                Time left: {{ calculateRemainingTime(item) }}
              </div>            
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="removeFromCart(item.id, item.IdinItems,item.bookedUserId,item.bookedItem,item.collectionMethod)">Remove</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else-if="filteredCartItems.length === 0" class="empty-cart">You did not book any food or item.</div>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="summary-title">Booking Summary</v-card-title>
          <v-card-text class="summary-text">
            <div>{{ parseInt(itemCount) }} items</div>
            <div>Total: RM{{ totalPrice }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { db, auth } from '@/firebase/firebaseInit';
import { collection, query, onSnapshot,updateDoc, doc, increment,deleteDoc } from 'firebase/firestore';

export default {
  name: 'Booking',
  computed: {
    filteredCartItems() {
      const items = this.fetchedCartItems.filter(item => item.bookedUserId === this.currentUserId);
      console.log("Filtered Cart Items:", items);
      return items;    
    },
    currentUserId() {
      return auth.currentUser ? auth.currentUser.uid : null;
    },
    
    itemCount() {
      return this.filteredCartItems.reduce((total, item) => total + Number(item.bookedItem), 0);
    },
    totalPrice() {
      const total = this.filteredCartItems.reduce((total, item) => total + (item.price * item.bookedItem), 0);
      console.log("Total Price:", total);

      // Convert to a string with two decimal places
      return total.toFixed(2);
    }
  },
  data() {
    return {
      currentTime: Date.now(),
      fetchedCartItems: [],
      isLoading: true,
      unsubscribe: null,
      messageShown: false,
    };
  },
  methods: {
    fetchCartItems() {
      const q = query(collection(db, 'cartItems'));
      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.fetchedCartItems = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const addedAtTime = data.addedAt ? data.addedAt.toMillis() : null;
          return { id: doc.id, ...data, addedAt: addedAtTime };
        });
        this.isLoading = false;
      });
    },
    async removeFromCart(itemId, IdinItems, bookedUserId, bookedItem, collectionMethod) {
  // Check if the bookedUserId matches the current user's ID
  if (bookedUserId === this.currentUserId) {
    const cartItemRef = doc(db, 'cartItems', itemId);
    const itemRef = doc(db, collectionMethod === 'shop' ? 'foods' : 'items', IdinItems);
    
    try {
      // Update the item's quantity in Firestore
      await updateDoc(itemRef, { 
        quantity: increment(bookedItem) 
      });
      console.log(`Item quantity updated in Firestore ${collectionMethod === 'shop' ? 'foods' : 'items'}:`, IdinItems);

      // Remove the item from the cart
      await deleteDoc(cartItemRef);
      console.log("Item removed from Firestore cartItems:", itemId);
    } catch (error) {
      console.log(`Error updating item quantity in Firestore ${collectionMethod === 'shop' ? 'foods' : 'items'}:`, error);
    }    
  }
},
calculateRemainingTime(item) {
    const duration = item.reservedDuration * 1000; // Convert seconds to milliseconds
    if (!item.addedAt) return "No timer set";

    const timeLeft = item.addedAt + duration - this.currentTime;
    if (timeLeft <= 0) {
      if (!this.messageShown) {
        const message = `Time's up for ${item.name}, ${item.bookedItem} item(s) removed`;
        this.$store.commit('setMessage', message);
        this.$store.commit('setIsMessageVisible', true);
        this.messageShown = true; // Set a flag to indicate the message is shown

        // Call removeFromCart for this item
        this.removeFromCart(item.id, item.IdinItems, item.bookedUserId, item.bookedItem, item.collectionMethod);
      }
      return "Time's up";
    }
    this.messageShown = false; // Reset the flag
    return this.formatTime(timeLeft);
  },
  
    formatTime(milliseconds) {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    imageLoadError(event) {
      console.error('Error loading image');
      event.target.src = 'https://via.placeholder.com/100'; // Placeholder image
    }
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    clearInterval(this.interval);
  },
  mounted() {
  this.fetchCartItems();
  this.interval = setInterval(() => {
    this.currentTime = Date.now();
  }, 1000);
}
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

<style>
.summary-title {
  background-color: #1A6757; /* Replace with your navbar color */
  color: white; /* Or any color that contrasts well with your background */
  padding: 10px;
}

.summary-text {
  background-color: #104a3e; /* A lighter or darker tone of your navbar color */
  padding: 10px;
  color: white;
}

/* Additional styling to enhance the card appearance */
.v-card {
  border-radius: 5px; /* Rounded corners for the card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
}
.booking-item-image {
  margin-bottom: 10px; /* Space below the image */
}

.v-img {
  border-radius: 4px; /* Rounded corners for the image */
}
.free-label {
  background-color: #90ee90; /* Light green background */
  color: white;
  padding: 2px 8px;
  border-radius: 15px; /* Oval shape */
  font-size: 0.9em;
}
.item-card {
  position: relative; /* Needed for absolute positioning of the label */
}

.collection-method-label {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.8em;
}

.food-label {
  background-color: #2196F3; /* Blue background for Food */
}

.item-label {
  background-color: #FFA500; /* Orange background for Item */
}

</style>


