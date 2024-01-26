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
            <div class="booking-item-image">
              <v-img 
              :src="item.imageUrl" 
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
              RM{{ item.price }} x {{ item.quantity }}
            </template>
          </div>
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
import { cartStore } from '@/cartStore';
import { db } from '@/firebase/firebaseInit'
import { collection, query, onSnapshot } from 'firebase/firestore';


export default {
  name: 'Booking',
  computed: {
    cartItems() {
      return cartStore.items;
    },
    itemCount() {
    //return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    return this.cartItems.reduce((total, item) => total + Number(item.quantity), 0);

  },
  totalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  },

  data() {
    return {
      currentTime: Date.now(), // Add this new property
      // ... other data properties
    };
  },

  methods: {
    removeFromCart(index) {
      cartStore.removeFromCart(index);
      console.log("Item removed from cart:", index);
    },
  
    calculateRemainingTime(addedAt) {
      const duration = 30 * 60 * 1000; // 30 minutes in milliseconds
      const timeLeft = addedAt + duration - this.currentTime; // Use currentTime
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
  clearInterval(this.interval); // Clear the interval when the component is destroyed
},
  
  mounted() {
    this.interval = setInterval(() => {
      this.currentTime = Date.now(); // Update currentTime every second
    }, 1000);
  },
  
}
</script>

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


