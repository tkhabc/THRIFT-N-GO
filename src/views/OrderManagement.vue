<template>
  <v-container>
    <v-row justify="center">
      <!-- Display each item in a Vuetify card -->
      <v-col cols="12" sm="6" md="4" v-for="item in itemsOrder" :key="item.id">
        <v-card class="mb-4">
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            Booked by: {{ item.bookerUsername }}
          </v-card-subtitle>
          <v-card-text>
            Quantity Booked: {{ item.bookedItem }}
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Message if no items are found -->
      <v-col cols="12" v-if="itemsOrder.length === 0">
        <v-alert type="info">
          You don't have any food/items being booked.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { db, auth } from '@/firebase/firebaseInit';
import { ref, onMounted } from 'vue';
import { query, collection, onSnapshot, doc, getDoc } from 'firebase/firestore'; // Correct import

export default {
  data() {
    return {
      itemsOrder: [],  
    };
  },
  methods: {
    async fetchItems() {
      const q = query(collection(db, 'cartItems'));
      onSnapshot(q, async (querySnapshot) => {
        const itemsWithUsernames = await Promise.all(querySnapshot.docs.map(async documentSnapshot => {
          const itemData = documentSnapshot.data();
          if (itemData.bookedUserId) {
            const userDocRef = doc(db, 'users', itemData.bookedUserId); // Correct usage of doc
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              itemData.bookerUsername = userDoc.data().username;
            } else {
              itemData.bookerUsername = 'Unknown User';
            }
          }
          return { id: documentSnapshot.id, ...itemData };
        }));

        this.itemsOrder = itemsWithUsernames.filter(item => item.uid === auth.currentUser.uid);
      }, (error) => {
        console.error("Error fetching cart items:", error);
      });
    },
  },
  mounted() {
    this.fetchItems();
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}

.v-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
}

.v-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
}

.v-card-title {
  color: #4A4A4A; /* Dark Gray */
  font-weight: bold;
  font-size: 1.2em;
}

.v-card-subtitle {
  color: #787878; /* Medium Gray */
  margin-top: 5px;
}

.v-card-text {
  color: #333333; /* Darker Gray */
  margin-top: 10px;
}

.v-alert {
  margin-top: 20px;
}
</style>
