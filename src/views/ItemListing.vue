<template>
    <v-container class="container-padding">
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
    <v-row>
      <v-col>
        <input type="text" v-model="searchQuery" placeholder="Search items..." class="search-input">
      </v-col>
    </v-row>
  </v-container> 
  
    <!-- <v-card v-for="item in filteredItems" :key="item.id" class="mx-auto item-card" width="300"> -->
    <v-row class="row-padding">
      <v-col cols="6" xs="6" v-for="item in items" :key="item.id">
    <v-card  class="mx-auto" >
      <v-img  height="200" :src="getFirstPhoto(item)" @error="imageLoadError" cover>
        
      </v-img>
      <v-card-title class="text-white">{{ item.name }}</v-card-title>

      <!-- <v-card-subtitle class="pt-4">{{ item.shop }}</v-card-subtitle> -->

      <v-card-text>
        <div>{{ item.description }}</div>
        <div>Price: RM {{ item.price }}</div>
      </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn color="orange" block @click="addToCart(item)">Add to Cart</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="blue" block @click="goToLocation(item)">Location</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  
</template>

<script>
import { db } from '@/firebase/firebaseInit'
import { collection, query, getDocs,addDoc } from 'firebase/firestore'

export default {
  name: 'ItemListing',

  data() {
    return {
      items: [],
      searchQuery: '',
      cartItems: []
    };
  },

  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.name  && item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },

  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', this.item); // Emit the whole item object
    },
    async fetchItems() {
      const q = query(collection(db, 'items'));
      try {
        const querySnapshot = await getDocs(q);
        this.items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } 
      catch (error) {
        console.error("Error fetching items: ", error);
      }
    },
  
  // async addToCart(item) {
  //   // Firestore collection reference
  //   const cartCollectionRef = collection(db, 'cart');

  //   try {
  //     await addDoc(cartCollectionRef, item); // Add item to Firestore collection
  //     console.error("Item added to cart");
  //   } catch (error) {
  //     console.error("Error adding item to cart: ", error);
  //   }
  // },
  getFirstPhoto(item) {
    return item.photos && item.photos.length > 0 ? item.photos[0] : 'default-image-url.jpg';
  },

  imageLoadError() {
    console.error('Error loading image');
  },
    
    goToAddItem() {
      this.$router.push('/additem');
    },

    goToLocation(item) {
      this.$router.push({ name: 'UserLocation', query: { location: item.location } });
    },
  },

  mounted() {
    this.fetchItems();
  }
};
</script>

<style scoped>

.v-card-actions .v-btn {
  font-size: 0.65rem; /* Reduce font size; adjust as needed */
}
.container-padding {
  padding-left: 16px; /* Adjust the value as needed */
  padding-right: 16px;
}

.row-padding {
  padding-left: 16px; /* Adjust the value as needed */
  padding-right: 16px; /* Adjust the value as needed */
}
.item-card {
  width: 100%; /* Ensure card takes the full width of the column */
  margin: 0;
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
  background-color: #1A6757; /* Adjust the button color to match your theme */
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}

.item-card {
  padding: 5px; /* Increased padding for each card */
   /* Make cards take full width on small screens */
  border: 1px solid #ddd;
  border-radius: 8px;
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

.v-card-text {
  margin-bottom: -20px; /* Or, increase top padding of the text */
  margin-top:10px;
}

</style>
