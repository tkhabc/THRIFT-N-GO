<!-- <template>
  <div class="item-listing"> -->
    <!-- Your code here -->
   
  <!-- </div>
    <div class="search-add-area">
      <input type="text" placeholder="Enter your desired location" class="search-input">
      <button class="add-item-button" @click="goToAddItem">Add item</button>
    </div> -->
    
    <!-- List of food items -->
    <!-- <div class="items-grid"></div>
      <div class="item-card" v-for="item in items" :key="item.id">
        <div class="item-image-container">
          <img :src="item.image" :alt="item.name" class="item-image">
        </div>
        <div class="item-info">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-description">{{ item.description }}</p>
          <div class="item-details">
            <span class="item-shop">{{ item.shop }}</span>
            <span class="item-price">{{ item.price }}</span>
      </div>
    </div>
  </div> -->
<template>
  <div v-for="item in items" :key="item.id" class="item-card">
    <img :src="item.image" :alt="item.name" class="item-image">
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}</p>
    <p>Shop: {{ item.shop }}</p>
    <p>Price: {{ item.price }}</p>
  </div>
</template>

<script>
export default {
  name: 'ItemListing',
  data() {
    return {
      items: [{id: 1, 
    name: 'Item Name', 
    description: 'Item Description', 
    shop: 'Item Shop', 
    price: 'Item Price',
    image: '/src/assets/food.jpg'}] // existing items
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

  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
}
</style>
