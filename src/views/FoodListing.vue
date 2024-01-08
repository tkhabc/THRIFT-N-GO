<script setup>
import { FwbCard, FwbButton } from 'flowbite-vue'
</script>

<template>
  <div class="food-listing">
    <div class="search-add-area">
      <input type="text" placeholder="Enter your desired location" class="search-input">
      <button class="add-food-button" @click="goToAddFood">Add food</button>
    </div>
    <!-- Your food items here -->
  </div>
 
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <!-- <fwb-card
      img-alt="Desk"
      img-src="https://flowbite.com/docs/images/blog/image-1.jpg"
      variant="image"
    > -->
    <div class="card-image-container">
    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="Desk"> </div>
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </div>
    <!-- </fwb-card> -->

    <fwb-card
      img-alt="Desk"
      img-src="https://flowbite.com/docs/images/blog/image-1.jpg"
      variant="image"
    >
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </div>
    </fwb-card>
  </div>

  <fwb-button color="">Default</fwb-button>
  <fwb-button color="alternative">Alternative</fwb-button>
  <fwb-button color="dark">Dark</fwb-button>
  <fwb-button color="light">Light</fwb-button>
  <fwb-button color="green">Green</fwb-button>
  <fwb-button color="red">Red</fwb-button>
  <fwb-button color="yellow">Yellow</fwb-button>
  <fwb-button color="purple">Purple</fwb-button>
  <fwb-button color="pink">Pink</fwb-button>
</template>

<script>
export default {
  name: 'FoodListing',
  data() {
    return {
      // Assuming you have a list of items in your data
      items: []
    };
  },
  methods: {
    addNewItem(item) {
      // This method should add the new food item to the list
      this.items.push(item);
    },
    goToAddFood() {
      // This method changes the route to '/addfood'
      this.$router.push('/addfood');
    }
    // ...other methods...
  }
}
</script>


<style scoped>
.food-listing {
  max-width: 1200px;
  margin: auto;
  font-family: 'Arial', sans-serif;
}

.search-add-area {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.search-input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-food-button {
  padding: 10px 20px;
  background-color: #1A6757; /* Adjust the button color to match your theme */
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}

.add-food-button:hover {
  background-color: #43C3A0;
}

/* Add responsiveness */
@media (max-width: 768px) {
  .search-add-area {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
    margin-bottom: 10px;
  }

  .add-food-button {
    width: 100%;
  }
}
.card-image-container {
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.card-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
