<template>
    <form v-if="item" @submit.prevent="updateItem">
      <!-- Form fields bound to 'item' properties -->
      <input v-model="item.title" type="text" placeholder="Title">
      <input v-model="item.description" type="text" placeholder="Description">
      <!-- Add other fields as necessary -->
      
      <button type="submit">Update Item</button>
    </form>
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
