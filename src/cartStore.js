import { reactive } from 'vue';

export const cartStore = reactive({
  items: [],
  bookedItems: new Set(), // Track booked item IDs


  addToCart(item) {
    this.items.push(item);
    this.bookedItems.add(item.id); // Mark as booked
  },
  removeFromCart(index) {
    const item = this.items[index];
    this.bookedItems.delete(item.id); // Unmark as booked
    this.items.splice(index, 1);
  }
});

export default cartStore;