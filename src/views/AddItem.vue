@import 'flowbite-vue';

<template>
    <div class="add-item-container">
      <form @submit.prevent="submitForm">
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
          <input type="text" id="quantity" v-model="newItem.quantity" @input="validateNumber($event)" placeholder="" autocomplete="off" required>
        </div>


        <!-- Price Field -->
        <div class="form-group">
          <label for="price" class="form-label">Price</label>
          <input type="text" id="price" v-model="newItem.price" autocomplete="off" required>
        </div>
    
        <!-- Location Address Field -->
        <div class="form-group">
          <label for="location-address" class="form-label">Location Address</label>
          <textarea id="location-address" class="location-input" v-model="newItem.location" required rows="1"></textarea>
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
        <div class="button-container">
          <button type="submit">Confirm & Add</button>
        </div>
  
      </form>
    </div>
  </template>
  
    
  <script>

  export default {
    data() {
      return {
        newItem: {
          photos: [], // Updated to store multiple photos
          name: '',
          typeOfItem: '',
          description: '',  
          condition: '',
          quantity: '',
          price: '',
          location: '',
          collectionMethod: '',
        },
        errorMessage: '', // To display error messages
      };
    },
    methods: {
    handlePhotoUpload(event) {
      // Clear any previous error messages
      this.errorMessage = '';

      const files = event.target.files;
      const validTypes = ['image/png', 'image/jpeg'];

      Array.from(files).forEach(file => {
        if (!validTypes.includes(file.type)) {
          // If the file type is not allowed, set an error message
          this.errorMessage = 'Only PNG and JPG images are allowed.';
          // You can handle this error as needed, perhaps alerting the user or displaying a message
          return;
        }

        // If the file type is valid, create a URL and add it to the photos array
        const photoURL = URL.createObjectURL(file);
        this.newItem.photos.push({ url: photoURL, file });
      });
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
    submitForm() {
      // Here you would handle the form submission
      // Don't forget to revoke all object URLs to free up memory
      this.newItem.photos.forEach(photo => {
        URL.revokeObjectURL(photo.url);
      });
      // Clear the photos array after submission
      this.newItem.photos = [];


      // Log the submission or send it to your server
      console.log('Form submitted', this.newItem);
      // You might navigate away or reset the form state here

     
    },
    
    validateNumber(event) {
    // Replace non-numeric characters with an empty string
    event.target.value = event.target.value.replace(/[^0-9]+/g, '');
    },
  }

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
  
.button-container {
    display: flex;
    justify-content: flex-end; /* Aligns the button to the right */
}
  
button[type="submit"] {
    width: 22%;
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
</style>
  