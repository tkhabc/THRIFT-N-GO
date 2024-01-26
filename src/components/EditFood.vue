<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold">Edit Food</v-card-title>
          <v-card-text>
            <v-form v-if="food" @submit.prevent="updateFood">
              <!-- Vuetify text fields for name and description -->
              <v-text-field v-model="food.name" label="Name" outlined dense></v-text-field>
              <v-text-field v-model="food.shop" label="Restaurant" outlined dense></v-text-field>
              <v-text-field v-model="food.description" label="Description" outlined dense></v-text-field>
              <!-- <v-select v-model="food.condition" label="Condition" :foods="['New', 'Used']" outlined dense></v-select> -->
              <v-text-field v-model="food.quantity" label="Quantity" outlined dense></v-text-field>
              <v-text-field v-model="food.price" label="Price" outlined dense></v-text-field>
              <v-text-field v-model="food.location" label="Location Address" outlined dense></v-text-field>
              <v-text-field v-model="food.listingType" label="Type of Listing" :foods="['Sell', 'Donate']" outlined dense></v-text-field>
              <v-text-field v-model="food.collectionMethod" label="Collection Method" :foods="['Pickup', 'Delivery']" outlined dense></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
        <br><br>
        <div>
        <v-btn color="#1A6757" @click="updateItem" class="mr-4">Update Food</v-btn> <v-btn color="#1A6757" @click="$router.go(-1)">Return</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseInit';

export default {
  props: ['foodId'],
  data() {
    return {
      food: {title:'', description:'',} // This will hold the item data for editing
      // ... other data properties ...
    };
  },
  created() {
    this.loadFood();
  },
  methods: {
    async loadFood() {
    const docRef = doc(db, "foods", this.foodId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.food = docSnap.data();
      } else {
        console.log("No such food!");
      }
    } catch (error) {
      console.log("Error getting food:", error);
    }
  },

  async updateFood() {
    const docRef = doc(db, "foods", this.foodId);
    try {
      await updateDoc(docRef, this.food);
      console.log("Dood successfully updated!");
      // Navigation or success message
    } catch (error) {
      console.error("Error updating food: ", error);
    }
  },
    // ... methods to handle item updating ...
  }
}
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
</style>

