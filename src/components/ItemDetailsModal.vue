<template>
    <div class="modal-background" v-if="visible" @click.self="close">
      <div class="modal-content">
        <!-- If your item has photos, show the first one -->
        <img v-if="item.photos && item.photos.length" :src="item.photos[0].url" alt="Item photo" class="item-photo">
  
        <h2>{{ item.name }}</h2>
        <p>Item Description: {{ item.description }}</p>
        <!-- Display additional fields -->
        <p v-if="item.condition">Condition: {{ item.condition }}</p>
        <p v-if="item.quantity">Quantity: {{ item.quantity }}</p>
        <p>Price: RM {{ item.price }}</p>
        <p v-if="item.location">Location: {{ item.location }}</p>
        <p v-if="item.collectionMethod">Collection Method: {{ item.collectionMethod }}</p>
  
        <button @click="close">Close</button>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    item: Object,
    visible: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>
  
<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures the modal is on top of other content */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: auto; /* Allows the width to grow with content, up to the max-width */
  max-width: 600px; /* Maximum width of the modal */
  max-height: 80vh; /* Maximum height of the modal */
  overflow-y: auto; /* Allows scrolling within the modal */
  margin: 20px; /* Space around the modal */
}
.item-photo {
  max-width: 100%; /* Ensures the image width does not exceed the modal width */
  height: auto; /* Maintains the image's aspect ratio */
}
.modal-content button {
  background-color: red; /* Red background */
  color: white; /* White text */
  border: none; /* No border */
  padding: 10px 20px; /* Padding for size */
  border-radius: 5px; /* Rounded corners */
  font-weight: bold; /* Bold font */
}

</style>
  