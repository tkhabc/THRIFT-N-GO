<template>
  <div>
    <v-container class="container-padding">
      <v-row>
        <v-col>
          <div class="slider-caption">
      <label for="distance-slider">Filter Food by Distance (up to 20 km)</label>
    </div>
    <v-slider
      v-model="maxDistance"
      :max="20"
      step="5"
      show-ticks="always"
      tick-size="4"
      class="distance-slider"
      thumb-label="always"
      id="distance-slider"
      @change="filterItemsByDistance"
    >
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ maxDistance }} km</span>
          </template>
        </v-tooltip>
      </template>
    </v-slider>        
      </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input type="text" v-model="searchQuery" placeholder="Search food..." class="search-input">
        </v-col>
      </v-row>
      <v-row class="tight-row-spacing">
        <v-col>
          <button class="add-item-button" @click="goToAddFood">Sell/Donate Your Food</button>
        </v-col>
      </v-row>
    </v-container> 
    <v-dialog v-model="isQuantityDialogOpen" max-width="290">
    <v-card>
      <v-card-title class="headline">Select Quantity</v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedQuantity" type="number" label="Quantity" min="1" :max="selectedFoodForBooking?.quantity"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="confirmBooking">Confirm</v-btn>
        <v-btn color="red darken-1" text @click="isQuantityDialogOpen = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row class="row-padding">
    <v-col cols="6" xs="6" v-for="food in processAndFilterFoods(foods)" :key="food.id">
      <!-- Add @click event here -->
      <v-card :class="{'booked-item': food.booked, 'unavailable-item': food.quantity <= 0}" class="mx-auto clickable" style="position: relative;">
        <v-img height="200" :src="getPhoto(food)" @error="imageLoadError" cover @click="showModal(food)"></v-img>
        <button class="edit-button traditional-button" v-if="isOwner(food.uid)" @click="editFood(food.id)">Edit</button>
        <button class="delete-button" v-if="isOwner(food.uid)" @click="deleteFood(food.id)">X</button>
        <v-card-title>{{ food.name }}
          <span class="item-quantity-display">{{ food.quantity }} left</span></v-card-title>
        <v-card-text>
          <div class="price-display2" v-if="food.listingType === 'donate'">It's Free, Grab It Now!</div>
          <div class="price-display" v-else>RM {{ food.price }}</div>       
          <div>{{ food.shop }}</div>
          <div v-if="food.distance">{{ food.distance  < 0 ? 0 : food.distance }} away</div>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6" class="bookButton">
              <v-btn 
              :color="getFoodColor(food.quantity)" 
              block 
              @click.stop="food.quantity === 0 ? null : addToCart(food)"
              :disabled="food.quantity === 0"
              v-if="!isOwner(food.uid)"  
              >
              {{ getFoodLabel(food.quantity) }}
              </v-btn>

            </v-col>
            <v-col cols="6" class="locationButton">
              <v-btn color="green" block @click="goToLocation(food)" v-if="!isOwner(food.uid)">
                Location
              </v-btn>
            </v-col>
            <v-col cols="12" class="chatButton">
              <v-btn color="white" block @click="goToChat(food.uid)" v-if="!isOwner(food.uid)">
                Chat with Seller
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
        <div v-if="food.listingType === 'donate'" class="donation-badge">Donation</div>
        <div v-if="food.booked" class="booked-badge">Booked</div>
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
import { collection, query, onSnapshot, doc, deleteDoc, setDoc, addDoc,serverTimestamp } from 'firebase/firestore';
import { cartStore } from '@/cartStore'
import ItemDetailsModal from '@/components/ItemDetailsModal.vue'
import { auth } from "@/firebase/firebaseInit"
import { createOrGetChatroom } from "@/firebase/chatService"
import { omit } from 'lodash'; // Import the omit function


export default {
  name: 'FoodListing',

  components: {
    ItemDetailsModal // Register the ItemDetailsModal component
  },

  data() {
    return {
      foods: [],
      searchQuery: '',
      cartItems: [],
      selectedItem: null,
      isModalVisible: false,
      maxDistance: 20,
      isQuantityDialogOpen: false,
    selectedQuantity: 1, // Default quantity
    selectedItemForBooking: null// To keep track of the item being booked
  
    };
  },

  methods: {
    processAndFilterFoods(foods) {
    return foods.filter(food => {
      // Convert distance to a number and check if it's within the maxDistance
      const distanceKm = parseFloat(food.distance);
      const isWithinDistance = !isNaN(distanceKm) && distanceKm <= this.maxDistance;

      // Check if the food matches the search query
      const matchesSearchQuery = food.name && food.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Only include foods that match both the distance and search criteria
      return isWithinDistance && matchesSearchQuery;
    });
  },
  isItemBooked(foodId) {
      return cartStore.bookedItems.has(foodId);
    },
    isOwner(foodUploaderUID) {
      const currentUser = auth.currentUser;
      return currentUser && currentUser.uid === foodUploaderUID;
    },
    editFood(foodId) {
    this.$router.push({ name: 'EditFood', params: { foodId: foodId }});
  },

  async deleteFood(foodId) {
    // Correctly reference the Firestore instance
    const docRef = doc(db, "foods", foodId);
    try {
      await deleteDoc(docRef);
      console.log("Food successfully deleted!");
      this.foods = this.foods.filter(food => food.id !== foodId);
      // Optionally, refresh the foods list or navigate away
    } catch (error) {
      console.error("Error removing food: ", error);
          }
    },

    showModal(food) {
      this.selectedItem = food;
      this.isModalVisible = true;
    },
    
    hideModal() {
      this.isModalVisible = false;
    },

    addToCart(food) {
      this.selectedItemForBooking = food;
      this.isQuantityDialogOpen = true;
    },

async confirmBooking() {
  if (this.selectedItemForBooking) {
    // Calculate new quantity
    const newQuantity = this.selectedItemForBooking.quantity - this.selectedQuantity;

    try {
      const foodRef = doc(db, "foods", this.selectedItemForBooking.id);
        setDoc(foodRef, { quantity: newQuantity }, { merge: true })
        .then(() => console.log("Quantity updated in Firestore"))
        .catch(error => console.error("Error updating quantity:", error));

      // Add to cart and close dialog
      //cartStore.addToCart(this.selectedItemForBooking, this.selectedQuantity);
      this.isQuantityDialogOpen = false;
      console.log("Quantity updated in Firestore and locally");

      // Get the UID of the current user
      const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

      // Check if a user is logged in
      if (currentUserId) {
        this.selectedItemForBooking.bookedUserId= currentUserId;
        this.selectedItemForBooking.bookedItem = this.selectedQuantity;
        this.selectedItemForBooking.addedAt=serverTimestamp();
        this.selectedItemForBooking.IdinItems = this.selectedItemForBooking.id;
        const selectedItemWithoutProperty = omit(this.selectedItemForBooking, 'id','quantity');
        await addDoc(collection(db, 'cartItems'), selectedItemWithoutProperty);
        // Add the cart item to Firestore
        //await addDoc(collection(db, "cartItems"), this.selectedItemForBooking);
        console.log("Cart item added with user UID");
        console.log("Cart item added with IdinItems",this.selectedItemForBooking.IdinItems);
      } else {
        console.error("No authenticated user found for adding to cart");
      }
    } catch (error) {
      console.error("Error in booking process:", error);
    }
  }
},

async fetchFoods() {
  const q = query(collection(db, 'foods'));
  onSnapshot(q, (querySnapshot) => {
    this.foods = querySnapshot.docs.map(doc => ({ id: doc.id, booked: false, ...doc.data() }));
  });
},
   async updateItemQuantityInFirestore(food) {
    const newQuantity = food.quantity - this.selectedQuantity; // Calculate new quantity
    const foodRef = doc(db, "foods", food.id);
    console.log("Original food quantity:", food.quantity);
    console.log("Selected quantity to book:", this.selectedQuantity);
    console.log("Current food quantity:", newQuantity);
    try {
      await setDoc(foodRef, { quantity: newQuantity }, { merge: true });
      console.log("Quantity updated in Firestore");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  },

  getPhoto(food) {
    if (food.photos && food.photos.length > 0) {
      return food.photos[0].url; 
    } 
    else {
      return 'https://via.placeholder.com/200';
      }
  },

  imageLoadError() {
    console.error('Error loading image');
    event.target.src = 'https://via.placeholder.com/200';
  },
    
    goToAddFood() {
      this.$router.push('/addfood');
    },

    async goToChat(sellerId) {
    const currentUserId = auth.currentUser.uid;

    if (currentUserId === sellerId) {
      console.log("Can't chat with yourself");
      return;
    }

    try {
      // createOrGetChatroom should return the chatroom ID
      const chatroomId = await createOrGetChatroom(currentUserId, sellerId);

      if (chatroomId) {
        // Navigate to the chatroom
        this.$router.push({ name: 'ChatRoom', params: { chatroomId } });
      } else {
        console.error("Failed to get or create chatroom");
      }
    } catch (error) {
      console.error("Error in goToChat: ", error);
    }
  },
    goToLocation(food) {
      this.$router.push({ name: 'UserLocation', query: { location: food.location } });
    },
    getFoodColor(quantity) {
      return quantity === 0 ? 'grey' : 'orange';
    },

    getFoodLabel(quantity) {
      return quantity === 0 ? 'Booked' : 'Book';
    },
  },
 

  mounted() {
    this.fetchFoods();
  }
};
</script>

<style scoped>
.v-btn {
  font-size: 0.65rem; /* Reduce font size; adjust as needed */
}

.bookButton {
  padding-right: 0; 
  /* background-color: #FFB74D; */
}
.slider-caption {
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
}

.distance-slider {
  margin-top: 10px;
}

.locationButton{
  padding-right: 0; 
  /* background-color: #AED581; */
}

.chatButton {
  padding-right: 0; /* Remove right padding */
  background-color: #00897B;
  height: 100%;
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
  top: 170px;
  left: 0px;
  z-index: 10; /* Ensure the button is above other elements */
}

  
.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.9rem; 
  color: white;
  background-color: red; 
  border: none;
  border-radius: 50%; /* To make it look like a circle */
  padding: 0;
  line-height:1.5em; /* Aligns the text 'X' in the center */
  width: 1.5em; /* Ensures the width is enough for the content */
  height: 1.5em; /* Ensures the height is equal to width to make a circle */
  text-align: center; /* Ensures the 'X' is centered */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: adds some depth */
}

.v-card-actions .v-col {
  margin: 0;
  padding: 0;
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
.price-display {
    background-color: #4CAF50; /* Red background for price */
    color: white; /* White text for contrast */
    padding: 2px 5px; /* Reduced padding around text */
    border-radius: 4px; /* Rounded corners for aesthetic */
    font-size: 1.5em; /* Slightly larger font size for emphasis */
    display: flex; /* Use flexbox for alignment */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    width: 100px; /* Fixed width for uniform appearance */
    height: 33px; /* Fixed height for uniform appearance */
    margin-top: 1px; /* Optional: Add some space above the price display */
    text-align: center; /* Center the text within the box */
  }
  .price-display2 {
    background-color: #4CAF50; /* Red background for price */
    color: white; /* White text for contrast */
    padding: 2px 5px; /* Reduced padding around text */
    border-radius: 4px; /* Rounded corners for aesthetic */
    font-size: 1.1em; /* Slightly larger font size for emphasis */
    display: flex; /* Use flexbox for alignment */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    width: 170px; /* Fixed width for uniform appearance */
    height: 33px; /* Fixed height for uniform appearance */
    margin-top: 1px; /* Optional: Add some space above the price display */
    text-align: center; /* Center the text within the box */
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

/* Add a pseudo-element for the grey line */
.v-card-text::after {
  content: '';
  display: block;
  height: 1px; /* Make line thinner */
  background-color: #E0E0E0; /* Grey line color */
  margin-top: 12px; /* Increase space at the top */
  margin-bottom: 0; /* Adjust bottom margin as needed */
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
  padding-bottom: 0; /* Remove padding at the bottom */
  margin-bottom: 0;
  display: flex; /* Use flexbox for alignment */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */

}

.booked-item {
  opacity: 0.5; /* Makes the card slightly transparent */
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
.donation-badge {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  background-color: yellow; /* Green color for donation badge */
  color: black;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
}

.donation-item {
  border: 2px solid #4CAF50; /* Green border for donation items */
}
.item-quantity-display {
  position: absolute; /* Position the label absolutely within the card */
  top: 176.5px; /* Position from the bottom of the picture */
  right: 0px; /* Position from the right side of the picture */
  background-color: #4CAF50; /* Green background for visibility */
  color: white; /* White text for contrast */
  font-weight: bold; /* Bold font */
  padding: 5px 6px; /* Padding around the text */
  border-radius: 4px; /* Rounded corners */
  font-size: 0.8rem; /* Smaller font size */
}

.v-card .v-img {
  position: relative;
}
.unavailable-item {
  filter: grayscale(70%); /* Apply a full grayscale filter */
  opacity: 0.3; /* Reduce the opacity */
  pointer-events: none; /* Prevents clicking on the card */
  cursor: not-allowed;
}
</style>