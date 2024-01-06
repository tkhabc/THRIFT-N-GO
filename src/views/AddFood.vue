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
        <label for="item-name" class="form-label">Name of Food</label>
        <input type="text" id="item-name" v-model="newItem.name" required>
      </div>
  
      <!-- Type of Food Field -->
      <div class="form-group">
        <label for="food-type" class="form-label">Type of Food</label>
        <input type="text" id="food-type" v-model="newItem.foodType" required>
      </div>

      <!-- Brief Description Field -->
      <div class="form-group">
        <label for="description" class="form-label">Brief Description</label>
        <textarea id="description" class="description-input" v-model="newItem.description" required rows="2"></textarea>
      </div>

      <!-- Quantity Field -->
      <div class="form-group">
        <label for="quantity" class="form-label">Quantity</label>
        <input type="number" id="quantity" v-model="newItem.quantity" required>
      </div>

      <!-- Price Field -->
      <div class="form-group">
        <label for="price" class="form-label">Price</label>
        <input type="text" id="price" v-model="newItem.price" required>
      </div>

      <!-- Expiry Date Field -->
      <div class="form-group">
        <label for="expiry-date" class="form-label">Expiry Date</label>
        <input type="date" id="expiry-date" v-model="newItem.expiryDate" required>
      </div>

      <!-- Location Address Field -->
      <div class="form-group">
        <label for="location-address" class="form-label">Location Address</label>
        <textarea id="location-address" class="location-input" v-model="newItem.location" required rows="1"></textarea>
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
        foodType: '',
        description: '',
        quantity: null,
        price: '',
        expiryDate: '',
        location: ''
      }
    };
  },
  methods: {
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
.form-group input[type="number"], /* Added style for number input */
.form-group input[type="date"], /* Added style for date input */
.form-group select,
.form-group textarea {
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
