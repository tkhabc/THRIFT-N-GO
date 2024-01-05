<template>
    <div class="add-item-container">
      <form @submit.prevent="submitForm">
        <!-- Add Photo Field -->
        <div class="form-group">
          <label for="add-photo">Add Photo (PNG, JPG only)</label>
          <input type="file" id="add-photo" accept=".png, .jpg" @change="handlePhotoUpload" required>
        </div>
  
        <!-- Item Name Field -->
        <input type="text" v-model="newItem.name" placeholder="Item Name" required>
  
        <!-- Condition Field -->
        <div class="form-group">
          <label for="condition">Condition</label>
          <select id="condition" v-model="newItem.condition" required>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
  
        <!-- Location Address Field -->
        <input type="text" v-model="newItem.location" placeholder="Location Address" required>
  
        <!-- Price Field -->
        <input type="text" v-model="newItem.price" placeholder="Price" required>
  
        <!-- Collection Method Field -->
        <div class="form-group">
          <label for="collection-method">Collection Method</label>
          <select id="collection-method" v-model="newItem.collectionMethod" required>
            <option value="pick-up">Pick-up</option>
            <option value="delivery">Delivery</option>
            <option value="pick-up/delivery">Pick-up/Delivery</option>
          </select>
        </div>
  
        <!-- Submit Button -->
        <button type="submit">Confirm & Add</button>
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
  max-width: 600px;
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
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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
}

.form-group input[type="file"]::file-selector-button {
  padding: 10px 15px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
}

button[type="submit"] {
  padding: 10px 15px;
  background-color: #1A6757;
  color: white;
  border: none;
  border-radius: 4px;
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
