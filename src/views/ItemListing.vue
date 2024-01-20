<template>
  <div class="item-listing">
    <div class="search-add-area">
      <input type="text" placeholder="Enter your desired location" class="search-input">
      <button class="add-item-button" @click="goToAddItem">Add item</button>
    </div>

    <!-- Iterate over items array and display each item in a Vuetify card -->
    <div class="items-grid">
      <v-card v-for="item in items" :key="item.id" class="mx-auto item-card" max-width="400">
        <v-img class="align-end" height="200" :src="item.image" cover>
          <v-card-title class="text-white">{{ item.name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">{{ item.shop }}</v-card-subtitle>

        <v-card-text>
          <div>{{ item.description }}</div>
          <div>Price: {{ item.price }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange"> Add to cart </v-btn>
         
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>


<script>


export default {
  name: 'ItemListing',
  
  data() {
    return {
      items: [{name:"abc",description:"fgfd",shop:"trt",price:"ee",image:require('@/assets/food.jpg')},
      {name:"abc",description:"fgfd",shop:"trt",price:"ee",image:require('@/assets/food.jpg')},
      {name:"abc",description:"fgfd",shop:"trt",price:"ee",image:require('@/assets/food.jpg')},
      {name:"abc",description:"fgfd",shop:"trt",price:"ee",image:require('@/assets/food.jpg')}]
      // existing items
    };
    },
  
  methods: {
    addNewItem(item) {
      this.items.push(item);
    },
    goToAddItem() {
      this.$router.push('/additem');
    },
    fetchItems() {
      // Implement fetching logic here
      // For example, fetch from a backend API or local storage
    },
    // ...other methods, if needed...
  },
  mounted() {
    this.fetchItems();
  },
};
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
  .items-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for smaller screens */
  }
}

@media (max-width: 480px) {
  .items-grid {
    grid-template-columns: 1fr; /* 1 column for very small screens */
  }
}

  .search-input {
    width: 100%;
    margin-bottom: 10px;
  }

  .add-item-button {
    width: 100%;
  }

  .items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 20px;
}

  .item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  .item-image {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16/9; /* Adjust based on your image aspect ratio */
  }

  .item-info {
    padding: 10px;
    background-color: #f9f9f9;
  }

.v-card-title {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  color: white;
  padding: 8px; /* Add some padding around the text */
}
</style>
