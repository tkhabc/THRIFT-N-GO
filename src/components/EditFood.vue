<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold">Edit Food</v-card-title>
          <v-card-text>
            <v-form v-if="food" @submit.prevent="updateFood">
              <!-- Vuetify text fields for name, shop, description, etc. -->
              <v-text-field v-model="food.name" label="Name" outlined dense></v-text-field>
              <v-text-field v-model="food.shop" label="Restaurant" outlined dense></v-text-field>
              <v-text-field v-model="food.description" label="Description" outlined dense></v-text-field>
              <v-text-field v-model="food.quantity" label="Quantity" type="number" outlined dense></v-text-field>
              <v-text-field v-model="food.price" label="Price" type="number" outlined dense></v-text-field>
              <v-text-field v-model="food.location" label="Location Address" outlined dense></v-text-field>
              <v-select v-model="food.listingType" label="Type of Listing" :items="['Sell', 'Donate']" outlined dense></v-select>
              <v-select v-model="food.collectionMethod" label="Collection Method" :items="['Pickup', 'Delivery']" outlined dense></v-select>
            </v-form>
          </v-card-text>
        </v-card>
        <br><br>
        <div>
          <v-btn color="#1A6757" @click="updateFood" class="mr-4">Update Food</v-btn>
          <v-btn color="#1A6757" @click="$router.go(-1)">Return</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Update Successful</v-card-title>
      <v-card-text>
        {{ successMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { doc, getDoc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseInit';

export default {
  props: ['foodId'],
  data() {
    return {
      food: {}, // This will hold the food data for editing
      dialog: false, // Controls the visibility of the dialog
      successMessage: '', // Stores the success message
      originalFood: {}, // To store the original food data for comparison
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
          this.originalFood = JSON.parse(JSON.stringify(this.food));
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
        console.log("Food successfully updated!");
        await this.updateRelatedCartItems(this.foodId, this.food);
        this.showSuccessMessage();
      } catch (error) {
        console.error("Error updating food: ", error);
      }
    },

    showSuccessMessage() {
      let changedProperties = [];
      for (let key in this.food) {
        if (key === 'photos') continue;
        if (this.food[key] !== this.originalFood[key]) {
          changedProperties.push(key);
        }
      }

      this.successMessage = `Updated successfully!`;
      if (changedProperties.length > 0) {
        this.successMessage += ` Changed properties: ${changedProperties.join(', ')}`;
      } else {
        this.successMessage += ` No properties were changed.`;
      }
      this.dialog = true;
    },

    async updateRelatedCartItems(itemId, updatedItemData) {
  const cartItemsQuery = query(collection(db, "cartItems"), where("IdinItems", "==", itemId));
  const querySnapshot = await getDocs(cartItemsQuery);

  querySnapshot.forEach(async (docSnapshot) => {
    const cartItemRef = doc(db, "cartItems", docSnapshot.id);
    const cartItemData = docSnapshot.data();

    // Prepare the data to update
    let updateData = {};
    for (let key in updatedItemData) {
      if (Object.prototype.hasOwnProperty.call(cartItemData, key)) {
        updateData[key] = updatedItemData[key];
        console.log(`Updating cart item ${docSnapshot.id} with ${key}: ${updatedItemData[key]}`);
      }

    }

    // Perform the update
    if (Object.keys(updateData).length > 0) {
      await updateDoc(cartItemRef, updateData);
      console.log(`Cart item ${docSnapshot.id} successfully updated based on item data!`);
    }
  });
  console.log("Cart item(s) successfully updated based on item data!");
},
  }
}
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
</style>
