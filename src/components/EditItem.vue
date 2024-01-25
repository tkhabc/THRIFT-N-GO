<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Edit Item</v-card-title>
          <v-card-text>
            <v-form v-if="item" @submit.prevent="updateItem">
              <!-- Vuetify text fields for name and description -->
              <v-text-field v-model="item.name" label="Name" outlined dense></v-text-field>
              <v-text-field v-model="item.description" label="Description" outlined dense></v-text-field>
              <v-select v-model="item.condition" label="Condition" :items="['New', 'Used']" outlined dense></v-select>
              <v-text-field v-model="item.quantity" label="Quantity" outlined dense></v-text-field>
              <v-text-field v-model="item.price" label="Price" outlined dense></v-text-field>
              <v-text-field v-model="item.location" label="Location Address" outlined dense></v-text-field>
              <v-text-field v-model="item.listingType" label="Type of Listing" :items="['Sell', 'Donate']" outlined dense></v-text-field>
              <v-text-field v-model="item.collectionMethod" label="Collection Method" :items="['Pickup', 'Delivery']" outlined dense></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
        <br><br>
        <div>
        <v-btn color="#1A6757" @click="updateItem" class="mr-4">Update Item</v-btn> <v-btn color="#1A6757" @click="$router.go(-1)">Return</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseInit';

export default {
  props: ['itemId'],
  data() {
    return {
      item: {title:'', description:'',} // This will hold the item data for editing
      // ... other data properties ...
    };
  },
  created() {
    this.loadItem();
  },
  methods: {
    async loadItem() {
    const docRef = doc(db, "items", this.itemId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.item = docSnap.data();
      } else {
        console.log("No such item!");
      }
    } catch (error) {
      console.log("Error getting item:", error);
    }
  },

  async updateItem() {
    const docRef = doc(db, "items", this.itemId);
    try {
      await updateDoc(docRef, this.item);
      console.log("Item successfully updated!");
      // Navigation or success message
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  },
    // ... methods to handle item updating ...
  }
}
</script>
