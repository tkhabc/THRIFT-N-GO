<template>
    <v-container>
    <v-row>
      <v-col>
        <div class="item-listing"></div>
        <div class="search-add-area"></div>
        <input type="text" placeholder="Enter your desired location" class="search-input">
      </v-col>
    </v-row>
    <v-row class="tight-row-spacing">
      <v-col>
        <button class="add-item-button" @click="goToAddItem">Add item</button>
      </v-col>
    </v-row>
  </v-container> 

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
          <v-btn color="orange" @click="addToCart(item)"> Add to Cart </v-btn>
          <v-btn color="blue" @click="goToLocation(item)">Location</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'ItemListing',

  data() {
    return {
      items: [],
      cartItems: []
    };
  },

  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', item); // Emit the whole item object
    },
    addNewItem(item) {
      this.items.push(item);
      localStorage.setItem('items', JSON.stringify(this.items));
    },
    
    goToAddItem() {
      this.$router.push('/additem');
    },
    goToLocation(item) {
    this.$router.push({ name: 'UserLocation', query: { location: item.location } });
  },

  loadItems() {
      try {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
          this.items = JSON.parse(storedItems);
        }
      } catch (error) {
        console.error("Error parsing items from Local Storage:", error);
      }
    }
  },

  // mounted() {
  //   this.loadItems();

  //   if (this.$route.query.newItem) {
  //     const newItem = JSON.parse(this.$route.query.newItem);
  //     this.addNewItem(newItem);
  //   }
  // }
  mounted() {
  // Load existing items from Local Storage
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    try {
      this.items = JSON.parse(storedItems);
    } catch (error) {
      console.error("Error parsing items from Local Storage:", error);
    }
  }

  // Check if newItem exists in the route query
  if (this.$route.query.newItem) {
    const newItem = JSON.parse(this.$route.query.newItem);
    
    // Retrieve the image from Local Storage
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
      newItem.image = uploadedImage;
      localStorage.removeItem('uploadedImage');
    }
    
    // Add the newItem to the items array
    this.items.push(newItem);
  }
}
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
  margin: 15px;
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
  background-color: #1A6757;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}

.add-item-button:hover {
  background-color: #43C3A0;
}

/* Adjustments for screens up to 932px wide */
@media (max-width: 932px) {
  .items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns for screens <= 932px */
    gap: 20px;
  }
}

/* Further adjustments for smaller screens */
@media (max-width: 430px) {
  .search-input, .add-item-button {
    width: 100%; /* Full width for smaller screens */
    margin-bottom: 10px;
  }

  .item-card {
    max-width: 100%; /* Ensure card does not exceed container width */
    margin: 0 auto; /* Center align the card */
  }
}

  .items-grid {
    grid-template-columns: 1fr; /* 1 column for very small screens */
  }
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
