import { reactive } from 'vue';

export const cartStore = reactive({
  items: [],

  addToCart(item) {
    this.items.push(item);
  },
  removeFromCart(index) {
    this.items.splice(index, 1);
  }
});

export default cartStore;