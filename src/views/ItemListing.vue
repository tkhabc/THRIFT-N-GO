<template>
  <div>
    <v-container class="container-padding">
      <v-row>
        <v-col>
          <div class="item-listing"></div>
          <div class="search-add-area"></div>
          <input type="text" placeholder="Enter your desired location" class="search-input">
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input type="text" v-model="searchQuery" placeholder="Search items..." class="search-input">
        </v-col>
      </v-row>
      <v-row class="tight-row-spacing">
        <v-col>
          <button class="add-item-button" @click="goToAddItem">Sell Your Item Here</button>
        </v-col>
      </v-row>
    </v-container> 

    <v-row class="row-padding">
      <v-col cols="6" xs="6" v-for="item in processAndFilterItems(items)" :key="item.id">
        <!-- Add @click event here -->
        <v-card :class="{'booked-item': item.booked}" class="mx-auto clickable" @click="showModal(item)" style="position: relative;">
          <v-img height="200" :src="getPhoto(item)" @error="imageLoadError" cover></v-img>
          <button class="edit-button traditional-button" v-if="isOwner(item.uid)" @click="editItem(item.id)">Edit</button>
          <button class="delete-button" v-if="isOwner(item.uid)" @click="deleteItem(item.id)">X</button>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <div>RM {{ item.price }}</div>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn :color="item.booked ? 'grey' : 'orange'" block @click="addToCart(item)">
                  {{ item.booked ? 'Booked' : 'Book' }}
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="green" block @click="goToLocation(item)">Location</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn color="blue" block @click="initiateChat(item.uid)">Chat with Seller</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <div v-if="item.booked" class="booked-badge">Booked</div>
        </v-card>
      </v-col>
    </v-row>
    
    <ItemDetailsModal
      :item="selectedItem"
      :visible="isModalVisible"
      @close="hideModal"
    />
  </div>
</template>


<script>
import { db } from '@/firebase/firebaseInit'
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore' 
import { cartStore } from '@/cartStore'
import ItemDetailsModal from '@/components/ItemDetailsModal.vue'
import { auth } from "@/firebase/firebaseInit"


export default {
  name: 'ItemListing',

  components: {
    ItemDetailsModal // Register the ItemDetailsModal component
  },

  data() {
    return {
      items: [],
      searchQuery: '',
      cartItems: [],
      selectedItem: null,
      isModalVisible: false
    };
  },

//   computed: {
//     filteredItems() {
//   return this.items.filter(item => {
//     item.booked = cartStore.isItemBooked(item.id); // Update booked status
//     return item.name && item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
//   });
// },
    
//   },

  methods: {
    processAndFilterItems(items) {
      return items.filter(item => {
        item.booked = cartStore.isItemBooked(item.id); // Update booked status
        return item.name && item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    isOwner(itemUploaderUID) {
      const currentUser = auth.currentUser;
      return currentUser && currentUser.uid === itemUploaderUID;
    },
    editItem(itemId) {
    this.$router.push({ name: 'EditItem', params: { itemId: itemId }});
  },

  async deleteItem(itemId) {
    // Correctly reference the Firestore instance
    const docRef = doc(db, "items", itemId);
    try {
      await deleteDoc(docRef);
      console.log("Item successfully deleted!");
      this.items = this.items.filter(item => item.id !== itemId);
      // Optionally, refresh the items list or navigate away
    } catch (error) {
      console.error("Error removing item: ", error);
          }
    },

    showModal(item) {
      this.selectedItem = item;
      this.isModalVisible = true;
    },
    
    hideModal() {
      this.isModalVisible = false;
    },

    addToCart(item) {
  if (!cartStore.isItemBooked(item.id)) {
    cartStore.addToCart(item);
    // No need to update item.booked here, it will be computed based on cartStore
  }
},
    async fetchItems() {
      const q = query(collection(db, 'items'));
      try {
        const querySnapshot = await getDocs(q);
        this.items = querySnapshot.docs.map(doc => ({ id: doc.id,booked: false, ...doc.data() }));
      } 
      
      catch (error) {
        console.error("Error fetching items: ", error);
      }
    },

  getPhoto(item) {
    if (item.photos && item.photos.length > 0) {
      return item.photos[0].url; 
    } 
    else {
      return 'https://loremflickr.com/640/360';
      }
  },

  imageLoadError() {
    console.error('Error loading image');
    event.target.src = 'https://via.placeholder.com/200';
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
.v-btn {
  font-size: 0.65rem; /* Reduce font size; adjust as needed */
}

.traditional-button {
  font-size: 0.8rem; /* Adjust the font size as needed */
  background-color: #3498db; /* A nice blue shade */
  color: white; /* White text */
  border: none; /* No border for a flat design */
  border-radius: 4px; /* Rounded corners */
  padding: 5px 10px; /* Padding inside the button */
  cursor: pointer; /* Cursor to indicate it's clickable */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Optional: adds some depth */
}

.edit-button {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10; /* Ensure the button is above other elements */
}


.delete-button {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 0.9rem; /* Adjust as needed */
  color: white;
  background-color: red; /* Or any other color you prefer */
  border: none;
  border-radius: 50%; /* To make it look like a circle */
  padding: 5px 7px; /* Adjust the padding to ensure it's circular */
  line-height: 1; /* Aligns the text 'X' in the center */
  width: 1.5em; /* Ensures the width is enough for the content */
  height: 1.5em; /* Ensures the height is equal to width to make a circle */
  text-align: center; /* Ensures the 'X' is centered */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: adds some depth */
}

.v-card-actions .v-col {
  padding-top: 0; /* Remove padding at the top of the column */
  padding-bottom: 0; /* Remove padding at the bottom of the column */
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

.v-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* Add shadow for depth */
  transition: 0.3s; /* Smooth transition for hover effects */
  border-radius: 7px; /* Softer edges on the card */
  overflow: hidden; /* Ensures nothing spills out of the card */
  /* Adjust the max-height to limit the card size */
  max-height: 500px; /* Example height, adjust as necessary */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This will distribute space evenly inside the card */
}

.v-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); /* Larger shadow on hover */
}

.v-card-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
  font-weight: bold;
  font-size: 1rem;
  color: black;
  padding: 12px; /* More padding for title */
  line-height: 1 !important; 
  background-color: #FAFAFA;
}

.v-card-text {
  color: #757575;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Consistent font family */
  padding: 12px 12px; /* Consistent padding for better spacing */
  font-size: 0.8rem; /* Adjust font size for readability */
  line-height: 1.4; /* Improve line spacing */
  background-color: #FAFAFA;
  line-height: 1 !important; 
}

.booked-item {
  opacity: 0.6; /* Makes the card slightly transparent */
  border: 2px solid grey; /* Adds a grey border to indicate it's booked */
}

.booked-badge {
  position: absolute;
  top: 0px;
  right: 0px;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  background-color: #F44336; /* Red accent for urgency */
}
</style>
