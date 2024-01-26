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
                  <span class="free-label">Free</span> x {{ item.quantity }}
                </template>
                <template v-else>
                  RM{{ item.price }} x {{ item.bookedItem }}
                </template>
              </div>
              <div>Time left: {{ calculateRemainingTime(item.addedAt) }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="removeFromCart(item.id, item.bookedUserId)">Remove</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else-if="filteredCartItems.length === 0" class="empty-cart">You did not book any food or item.</div>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col cols="12" md="4">
        <!-- <v-card>
          <v-card-title class="summary-title">Booking Summary</v-card-title>
          <v-card-text class="summary-text">
            <div>{{ parseInt(itemCount) }} items</div>
            <div>Total: RM{{ totalPrice }}</div>
          </v-card-text>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { cartStore } from '@/cartStore';
import { db, auth } from '@/firebase/firebaseInit';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default {
  name: 'Booking',
  computed: {
    filteredCartItems() {
      return this.fetchedCartItems.filter(item => item.bookedUserId === this.currentUserId);
    },
    currentUserId() {
      return auth.currentUser ? auth.currentUser.uid : null;
    },
    cartItems() {
      return cartStore.items;
    },
    itemCount() {
      return this.cartItems.reduce((total, item) => total + Number(item.quantity), 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  data() {
    return {
      currentTime: Date.now(),
      fetchedCartItems: [],
      isLoading: true,
      unsubscribe: null,
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
    removeFromCart(index, userId) {
      // Implement your removal logic here
    },
    calculateRemainingTime(addedAt) {
      const duration = 30 * 60 * 1000; // 30 minutes in milliseconds
      if (!addedAt) return "No timer set";

      const timeLeft = addedAt + duration - this.currentTime;
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

</style>


