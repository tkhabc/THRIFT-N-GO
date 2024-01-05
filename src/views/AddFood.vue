<template>
  <div class="add-item-container">
    <form @submit.prevent="submitForm">
      <!-- Add Photo Field -->
      <div class="form-group">
        <label1 for="add-photo" class="form-label">Add Photo (PNG, JPG only)</label1>
        <input type="file" id="add-photo" accept=".png, .jpg" @change="handlePhotoUpload" required>
      </div>
  
      <!-- Item Name Field -->
      <div class="form-group">
        <label for="item-name" class="form-label">Item Name</label>
        <input type="text" id="item-name" v-model="newItem.name" required>
      </div>
  
      <!-- Condition Field -->
      <div class="form-group">
        <label for="condition" class="form-label">Condition</label>
        <select id="condition" v-model="newItem.condition" required>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>
  
      <!-- Location Address Field -->
      <div class="form-group">
        <label for="location-address" class="form-label">Location Address</label>
        <textarea id="location-address" class="location-input" v-model="newItem.location" required rows="1"></textarea>
      </div>
  
      <!-- Price Field -->
      <div class="form-group">
        <label for="price" class="form-label">Price</label>
        <input type="text" id="price" v-model="newItem.price" required>
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
          photo: null,
          name: '',
          condition: '',
          location: '',
          price: '',
          collectionMethod: ''
        }
      };
    },
    methods: {
      handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Assuming you want to save the photo as a data URL
          const reader = new FileReader();
          reader.onload = (e) => {
            this.newItem.photo = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitForm() {
        // Process form submission, add to store/server, then redirect
        this.$router.push('/foodlisting'); // Redirect to ItemListing after adding the item
      }
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
.form-group textarea.location-input {
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
