import { reactive } from 'vue'
import { db } from '@/firebase/firebaseInit'; // adjust the path as necessary
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'


export const cartStore = reactive({
  items: [],
  bookedItems: new Set(), // Track booked item IDs


  addToCart(item) {
    const timestamp = Date.now(); // Current time in milliseconds
    this.items.push({ ...item, addedAt: timestamp });
    this.bookedItems.add(item.id); // Mark as booked
  },
    
  removeFromCart(index) {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      this.bookedItems.delete(item.id); // Unmark as booked
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index for removeFromCart');
    }
  },
  isItemBooked(id) {
    return this.bookedItems.has(id); // Check if item is booked
  }
});

export default cartStore;