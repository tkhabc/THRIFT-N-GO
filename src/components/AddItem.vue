<template>
  <div class="add-item-container">
    <form @submit.prevent="">
      <!-- Drag and Drop Photo Field -->
      <div class="form-group">
        <label1 for="add-photo" class="form-label">Add Photo (PNG, JPG only)</label1>
        <div class="drag-drop-area" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
          Drag & Drop your files or <span class="browse-link" @click="triggerFileInput">Browse</span>
          <input type="file" id="add-photo" ref="fileInput" accept=".png, .jpg" @change="handlePhotoUpload" multiple required style="display: none;">
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <!-- Image Previews -->
      <div class="image-previews">
        <div v-for="(photo, index) in newItem.photos" :key="photo.url" class="image-preview-container">
          <img :src="photo.url" :alt="'Photo ' + index" class="image-preview">
          <button @click="removePhoto(index, $event)" class="delete-photo" aria-label="Remove photo">×</button>
        </div>
      </div>

      <!-- Item Name Field -->
      <div class="form-group">
        <label for="item-name" class="form-label">Name of Item</label>
        <input type="text" id="item-name" v-model="newItem.name" autocomplete="off" required>
      </div>

      <!-- Brief Description Field -->
      <div class="form-group">
        <label for="brief-description" class="form-label">Brief Description</label>
        <textarea id="brief-description" class="description-input" v-model="newItem.description" required rows="2"></textarea>
      </div>

      <!-- Condition Field -->
      <div class="form-group">
        <label for="condition" class="form-label">Condition</label>
        <select id="condition" v-model="newItem.condition" required>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      <!-- Quantity Field -->
      <div class="form-group">
        <label for="quantity" class="form-label">Quantity</label>
        <input type="text" id="quantity" v-model="newItem.quantity" @input="validateNumber($event)" placeholder="Integer only" autocomplete="off" required>
      </div>


      <!-- Price Field -->
      <div class="form-group">
        <label for="price" class="form-label">Price</label>
        <div class="input-with-prefix">
        <span class="prefix">RM</span>
        <input type="text" id="price" v-model="newItem.price" 
        :disabled="isDonation" 
        :placeholder="isDonation ? 'It is a donation' : ''"
        autocomplete="off" required>
        </div>
      </div>
  
      <!-- Location Address Field -->
      <div class="form-group">
        <label for="location-address" class="form-label">Location Address</label>
        <textarea id="location-address" class="location-input" v-model="newItem.location" required rows="1"></textarea>
      </div>
  
      <div class="form-group">
        <label for="item-type" class="form-label">Type of Listing</label>
        <select id="item-type" v-model="newItem.listingType" required>
          <option value="sell">Sell</option>
          <option value="donate">Donate</option>
        </select>
      </div>

      <!-- Collection Method Field -->
      <div class="form-group">
        <label for="collection-method" class="form-label">Collection Method</label>
        <select id="collection-method" v-model="newItem.collectionMethod" required>
          <option value="pick-up">Pick-up</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      
      <!-- Submit Button -->
      <div class="message-input">
        <v-btn
        @click="$router.go(-1)"
        style="width: 80px; height: 50px; background-color: #1A6757" 
        class="ma-2"
        >
        <v-icon icon="mdi-arrow-left" size="25"> </v-icon>
        </v-btn>
        <v-btn class="ma-2" style="width: 240px; height: 50px; position:absolute; right:40px" @click="validateItem()">Confirm & Add</v-btn>
      </div>

    </form>
  </div>
</template>

  
<script>
import { db } from '@/firebase/firebaseInit'
import { collection, addDoc } from 'firebase/firestore'
import { storage } from '@/firebase/firebaseInit'
import { ref,  uploadString, getDownloadURL} from "firebase/storage"
import { auth } from "@/firebase/firebaseInit" 
/* global google */
import axios from "axios";

export default {
data() {
  return {
    newItem: {
      photos: [], 
      name: '',
      typeOfItem: '',
      description: '',  
      condition: '',
      quantity: '',
      price: '',
      location: '',
      listingType: '', 
      collectionMethod: '',
      uid: '',
      distance:null,
    },
    errorMessage: '',
    userCurrentLocation: null, // Added to track the user's current location
  };
},
computed: {
  isDonation() {
    return this.newItem.listingType === 'donate';
  },
},
watch: {
  'newItem.listingType'(newType) {
    if (newType === 'donate') {
      this.newItem.price = ''; // Clear the price
    }
  },
},

methods: {
  async getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userCurrentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },
  async calculateDistance(itemLocation) {
      const directionsService = new google.maps.DirectionsService();
      try {
        const result = await directionsService.route({
          origin: this.userCurrentLocation,
          destination: itemLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        if (result.status === 'OK') {
          return result.routes[0].legs[0].distance.text;
        } else {
          console.error('Directions request failed due to ' + result.status);
        }
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
      return null;
    },
    async addItem() {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in!");
        return;
      }
      this.newItem.uid = user.uid;
      const distance = await this.calculateDistance(this.newItem.location);
      if (distance) {
        this.newItem.distance = distance;
        // Add the item to Firestore here
      } else {
        console.error("Distance could not be calculated");
      }
      try {
      // Store the newItem object in Firestore
      await addDoc(collection(db, 'items'), this.newItem);
      this.resetForm();
      this.$router.push('/itemlisting');
      alert('Item added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    },
  handlePhotoUpload(event) {
    this.errorMessage = '';
    this.newItem.photos = [];

    const files = event.target.files;
    const validTypes = ['image/png', 'image/jpeg'];

    if (files.length === 0) {
      return; // No file was selected
    }

    const processFile = async(file) => {
      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Only PNG and JPG images are allowed.';
        return;
      }

    const reader = new FileReader();
    reader.onload = async(e) => {
      const photoBase64 = e.target.result;
      const randomId = Math.random().toString(36).substring(2);
      // Create a reference to the Firestore storage location
      const storageRef = ref(storage, `images/${randomId}.jpg`);

      try {
        // Upload the Base64-encoded image to Firestore
        const snapshot = await uploadString(storageRef, photoBase64, 'data_url');

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Add the download URL to your data structure or Firestore database
        this.newItem.photos.push({ url: downloadURL });
      } 
      catch (error) {
        console.error('Error uploading image to Firestore:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  for (const file of files) {
    processFile(file);
  } 
},

  handleDragOver(event) {
    event.preventDefault();
    // Optionally, add visual feedback here
  },
  handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.files) {
      this.handlePhotoUpload({ target: { files: event.dataTransfer.files } });
    }
  },
  triggerFileInput() {
    this.$refs.fileInput.click();
  },
  removePhoto(index) {
    event.preventDefault();  // Prevent default action
    event.stopPropagation(); // Stop event bubbling
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(this.newItem.photos[index].url);
    // Remove the photo from the array
    this.newItem.photos.splice(index, 1);
  },
  validateItem() {
    // Check if any of the required fields are empty
    if (
      this.newItem.name === '' ||
      this.newItem.description === '' ||
      this.newItem.condition === '' ||
      this.newItem.quantity === '' ||
      (this.newItem.price === '' && this.newItem.listingType==='sell')||
      this.newItem.location === '' ||
      this.newItem.listingType === '' ||
      this.newItem.collectionMethod === ''
    ) {
      alert('Please fill in all the required fields.');
    }
    else{this.addItem();}
    // If all required fields are filled, proceed to add the item
    },

    
  resetForm() {
    // Clearing the form and revoking URLs
    this.newItem.photos.forEach(photo => URL.revokeObjectURL(photo.url));
    this.newItem = {
      photos: [],
      name: '',
      description: '',  
      condition: '',
      quantity: '',
      price: '',
      location: '',
      collectionMethod: '',
    };
  },

  validateNumber(event) {
    event.target.value = event.target.value.replace(/[^0-9]+/g, '');
  }
},
mounted() {
  this.getCurrentLocation(); // Get the user's current location when the component mounts
},
}
</script>
  
<style scoped>
.add-item-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-item-container form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 30px;
}

.form-group label1 {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 18px;
}

.drag-drop-area {
padding: 20px;
border: 2px dashed #ccc; /* Dashed border for drag drop area */
border-radius: 4px;
text-align: center;
cursor: pointer;
position: relative; /* Allow absolute positioning inside */
}

.browse-link {
color: #1A6757;
text-decoration: underline;
cursor: pointer;
}

.image-previews {
display: flex;
flex-wrap: wrap;
margin-top: 10px;
}

.image-preview-container {
position: relative;
margin-right: 10px;
}

.image-preview {
max-width: 100px;
max-height: 100px;
border: 1px solid #ddd;
border-radius: 4px;
}

.delete-photo {
position: absolute;
top: 0;
right: 0;
background-color: #ff4d4d; /* Red color for better visibility */
color: white;
border: none;
cursor: pointer;
font-weight: bold;
font-size: 16px; /* Bigger font size for 'X' to be clear */
line-height: 16px;
width: 24px; /* Size of the button */
height: 24px; /* Size of the button */
border-radius: 12px; /* Circular shape */
display: flex;
align-items: center;
justify-content: center;
text-align: center;
padding: 0;
}


/* Add styles for the hidden file input */
input[type="file"] {
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}

.form-group label {
  display: flex;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 18px;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-group input[type="file"] {
  width: 28%;
  border: none;
  font-size: 15px;
}

.form-group input[type="file"]::file-selector-button {
  padding: 10px 15px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
}
.form-group textarea.location-input, .form-group textarea.description-input {
  width: 100%;
  padding: 10px 10px 0 10px; /* Adjust padding-top as necessary */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none; /* Prevents the textarea from being resizable */
  overflow: hidden; /* Prevents scrollbars from appearing */
  line-height: 1; /* Adjust line height to ensure the cursor aligns at the top */
  height: 120px; /* Set a fixed height, or adjust as necessary */
  box-sizing: border-box; /* Includes padding in the height calculation */
}

.message-input {
    display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #f8f8f8;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}
  
  .message-input input {
    flex-grow: 1;
  padding:  15px;
  border-radius: 25px;
  border: 2px solid #ddd;
  margin-right: 10px;
  }
  
  .message-input button {
    padding: 10px 20px;
    border-radius: 25px;
    background-color: #1A6757;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

button[type="submit"] {
width: 100%;
padding: 10px 15px;
background-color: #1A6757;
color: white;
border: none;
border-radius: 20px;
cursor: pointer;
font-size: 18px;
margin-top: 10px;
}

button[type="submit"]:hover {
  background-color: #43C3A0;
}

/* You might want to add media queries to make the form responsive */
@media (max-width: 768px) {
  .add-item-container {
    padding: 10px;
  }
}
.input-with-prefix {
  display: flex;
}

.prefix {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

#price {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  padding: 10px;
}

</style>
