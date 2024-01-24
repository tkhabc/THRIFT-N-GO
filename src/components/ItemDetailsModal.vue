<template>
  <div class="modal-background" v-if="visible" @click.self="close">
    <div class="modal-content">
      <!-- If your item has photos, show the first one -->
      <img v-if="item.photos && item.photos.length" :src="item.photos[0].url" alt="Item photo" class="item-photo">

      <h2>{{ item.name }}</h2>
      <hr class="modal-divider"> <!-- Horizontal line after the item name -->
      <h2>Description</h2>
      <p>{{ item.description }}</p>
      <hr class="modal-divider"> <!-- Horizontal line after the description -->
      <!-- Display additional fields -->
      <h2>Details</h2>
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
  
<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6); /* Slightly darker background for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* High z-index to be on top of other content */
}

.modal-divider {
  border: 0; /* Removes the default border */
  height: 0.1px; /* Sets the thickness of the line */
  background-color: #757575; /* Sets the color of the line */
  margin: 10px 0; /* Adds space above and below the line */
}

.modal-content {
  background: #ECEFF1; /* Soft gray background from your palette */
  padding: 30px; /* Increased padding for a more generous space */
  border-radius: 10px; /* Slightly larger border-radius for a softer look */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); /* Larger shadow for a pop-out effect */
  width: auto; /* Adaptive width */
  max-width: 500px; /* Slightly smaller max-width for a neater appearance */
  max-height: 80vh; /* Maximum height */
  overflow-y: auto; /* Scrolling for overflow content */
  margin: 20px; /* Margin around the modal */
  text-align: left;
}

.item-photo {
  max-width: 100%; /* Full width */
  border-top-left-radius: 10px; /* Rounded top corners */
  border-top-right-radius: 10px; /* Rounded top corners */
  height: auto; /* Maintain aspect ratio */
}

.modal-content h2 {
  color: #333; /* Darker font for the title for better readability */
  margin-bottom: 10px; /* Space after the title */
}

.modal-content p {
  color: #666; /* Dark gray for the paragraph text, softer than black */
  margin-bottom: 5px; /* Less space between paragraphs for a compact look */
}

.modal-content button {
  background-color: #1A6757; /* Teal color from your palette for the button */
  color: rgb(248, 235, 235); /* White text on the button */
  border: none; /* No border */
  padding: 12px 25px; /* Larger padding for a bigger button */
  border-radius: 20px; /* Fully rounded corners for the button */
  font-weight: bold; /* Bold font for the button text */
  cursor: pointer; /* Pointer cursor on hover */
}
</style>
  