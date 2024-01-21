
<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="item.title" type="text" placeholder="Title">
      <input v-model="item.description" type="textarea" placeholder="Description">
      <button type="submit">Add Item</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase/firebaseInit'; // Adjust this import based on your Firebase setup
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'AddItem',
  setup() {
    const item = ref({ title: '', description: '' });

    const submitForm = async () => {
      if (!item.value.title || !item.value.description) {
        alert('Please fill in all fields');
        return;
      }
      try {
        await addDoc(collection(db, 'items'), item.value);
        item.value.title = '';
        item.value.description = '';
        alert('Item added successfully');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };

    return { item, submitForm };
  }
};
</script>

<style>
/* Add your styles here */
</style>
