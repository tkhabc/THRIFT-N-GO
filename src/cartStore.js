import { reactive } from 'vue'
import { db } from '@/firebase/firebaseInit'; // adjust the path as necessary
import { collection, addDoc, doc, setDoc ,getDocs,query,deleteDoc,where,increment} from 'firebase/firestore'


export const cartStore = reactive({
  items: [],
  bookedItems: new Set(), // Track booked item IDs


  addToCart(item, quantity) {
    const timestamp = Date.now(); // Current time in milliseconds
    this.items.push({ ...item, quantity: quantity, addedAt: timestamp });
    this.bookedItems.add(item.id); // Mark as booked
  },
    
  async removeFromCart(index) {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      try {
        // Get cartItem record from Firestore
        const cartItemSnapshot = await getDocs(query(collection(db, "cartItems"), where("itemId", "==", item.id)));
        const cartItemDoc = cartItemSnapshot.docs[0];
  
        if (cartItemDoc) {
          // Increase the quantity in Firestore items collection
          const itemRef = doc(db, "items", item.id);
          await setDoc(itemRef, { quantity: increment(cartItemDoc.data().quantity) }, { merge: true });
  
          // Delete the record from Firestore cartItems collection
          await deleteDoc(doc(db, "cartItems", cartItemDoc.id));
        }
  
        // Unmark as booked and remove from local cart
        this.bookedItems.delete(item.id);
        this.items.splice(index, 1);
      } catch (error) {
        console.error('Error updating Firestore or removing from cart:', error);
      }
    } else {
      console.error('Invalid index for removeFromCart');
    }
  },
  isItemBooked(id) {
    return this.bookedItems.has(id); // Check if item is booked
  }
});

export default cartStore;