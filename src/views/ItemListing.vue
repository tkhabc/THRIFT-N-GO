<template>
  <div class="item-listing">
    <div class="search-add-area">
      <input type="text" placeholder="Enter your desired location" class="search-input">
      <button class="add-item-button" @click="goToAddItem">Add item</button>
    </div>
    <!-- Your food items here -->
  </div>
</template>

<script>
export default {
  name: 'ItemListing',
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
    goToAddItem() {
      // This method changes the route to '/addfood'
      this.$router.push('/additem');
    }
    // ...other methods...
  }
}
</script>


<style scoped>
.item-listing {
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

.add-item-button {
  padding: 10px 20px;
  background-color: #1A6757; /* Adjust the button color to match your theme */
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}

.add-item-button:hover {
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

  .add-item-button {
    width: 100%;
  }
}
</style>
