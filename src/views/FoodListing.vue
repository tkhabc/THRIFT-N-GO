<template>
  <div class="food-listing">
    <div class="search-add-area">
      <input type="text" placeholder="Enter your desired location" class="search-input">
      <button class="add-food-button" @click="goToAddFood">Add food</button>
    </div>
    <!-- Your food items here -->
  </div>
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
</style>
