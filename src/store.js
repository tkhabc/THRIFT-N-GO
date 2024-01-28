import Vuex from 'vuex';
import axios from 'axios';
let getUser = undefined;
import { db } from '@/firebase/firebaseInit';
import { collection, query, onSnapshot } from 'firebase/firestore';


if (window.currentUser) {
  getUser = window.currentUser;
}
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export const store = new Vuex.Store({
  state: {
    listings: {},
    users: {},
    session: { currentUser:getUser},
    errors: null,
    isMessageVisible: false, // New state property
    message: '' ,
    notifications:[],
    oldCartItems: {},
    cartItems: [],
   
    
    
  },
  getters: {
    listings: state => state.listings,
    users: state => state.users,
    session: state => state.session,
    errors: state => state.errors
  },
  mutations: {
    SET_CART_ITEMS(state, items) {
      state.cartItems = items;
    },
    SET_OLD_CART_ITEMS(state, items) {
      state.oldCartItems = items;
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
      console.log('Adding notification:', notification);
    },
    
    // Mutation to remove a notification
    REMOVE_NOTIFICATION(state, index) {
      state.notifications.splice(index, 1);
    },
    
    
    setIsMessageVisible(state, isVisible) {
      state.isMessageVisible = isVisible;
    },
    setMessage(state, message) {
      state.message = message;
    },
    
    ADD_CURRENT_USER (state, payload) {
      const currentUser = {
        id: payload.id,
        organization_name: payload.organization_name
      };
      state.session.currentUser = currentUser;
    },
    ADD_LISTING (state, payload) {
      const listing = {
        id: payload.id,
        list_name: payload.list_name,
        list_image: payload.list_image,
        user_id: payload.user_id,
        description: payload.description,
        end_date: payload.end_date,
        start_bid: payload.start_bid,
        list_url: payload.list_url
      };
      state.listings.unshift(listing); 
    },
    LOGOUT (state) {
      state.session = {currentUser: undefined};
      state.listings = {};
    },
    SET_ERRORS (state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS (state) {
      state.errors = null;
    },
    CLEAR_LISTINGS (state) {
      state.listings = {};
    },
    ADD_LISTINGS(state,payload){
      state.listings = Object.assign({},state.listings, payload);
    },
    ADD_USERS(state,payload){
      state.users = Object.assign({},state.users, payload);
    }
  },
  actions: {
    fetchCartItems({ commit,state }) {
      const q = query(collection(db, 'cartItems'));
      onSnapshot(q, (querySnapshot) => {
        let items = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const addedAtTime = data.addedAt ? data.addedAt.toMillis() : null;
          items.push({ id: doc.id, ...data, addedAt: addedAtTime });
        });

        commit('SET_CART_ITEMS', items);
        if (!state.oldCartItems || Object.keys(state.oldCartItems).length === 0) {
          const oldItems = items.reduce((acc, item) => {
            acc[item.id] = {...item};
            return acc;
          }, {});
          commit('SET_OLD_CART_ITEMS', oldItems);
        }
      });
    },
    listenToCartItems({ commit, state }) {
      console.log("Listening to cart items");
      const q = query(collection(db, 'cartItems'));
  
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          console.log('Change detected:', change.type, change.doc.data());
          if (change.type === "modified") {
            const newItem = change.doc.data();
            //const oldItem = state.oldCartItems[change.doc.id];
             const oldItemProxy = state.oldCartItems[change.doc.id];
            // // // Convert Proxy object to a plain object
             const oldItem = oldItemProxy ? JSON.parse(JSON.stringify(oldItemProxy)) : null;           
             console.log('New item:', newItem);
            console.log('Old item:', oldItem);
  
            if (!oldItem) {
              console.error(`Old item not found for id: ${change.doc.id}`);
              return;
            }
            // Create a message detailing the changes
            let changeMessages = [];
            if (!deepEqual(newItem.name, oldItem.name)) {
              changeMessages.push(`${oldItem.name} has a new name: ${newItem.name}`);
            }
            if (!deepEqual(newItem.listingType, oldItem.listingType)) {
              if (newItem.listingType === 'donate' && oldItem.listingType !== 'donate') {
                changeMessages.push(`${newItem.name} is free now.`);
              } else if (!deepEqual(newItem.price, oldItem.price)) {
                changeMessages.push(`${newItem.name} has a new price: RM${newItem.price}`);
              }
            }
            if (!deepEqual(newItem.price, oldItem.price)) {
              changeMessages.push(`${newItem.name} has a new price: RM${newItem.price}`);
            }
  
            // Additional checks using deepEqual
            if (!deepEqual(newItem.description, oldItem.description)) {
              changeMessages.push(`${newItem.name} has a new description.`);
            }
            if (!deepEqual(newItem.location, oldItem.location)) {
              changeMessages.push(`${newItem.name} has a new location.`);
            }
            if (!deepEqual(newItem.collectionMethod, oldItem.collectionMethod)) {
              changeMessages.push(`${newItem.name} has a new collection method.`);
            }
            if (!deepEqual(newItem.listingType, oldItem.listingType) && newItem.listingType !== 'donate') {
              changeMessages.push(`${newItem.name} has a new listing type: ${newItem.listingType}.`);
            }
  
            
              const detailedMessage = changeMessages.join('<br>');
              console.log('Detailed message:', detailedMessage);
              commit('ADD_NOTIFICATION', { message: detailedMessage, visible: true });
            
            
          }
        });
        
      });
    },
    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification);
    },
    
    // Action to remove a notification
    removeNotification({ commit }, index) {
      commit('REMOVE_NOTIFICATION', index);
    },
  
    addListing (context) {
      context.commit('ADD_LISTING');
    },
    clearListings (context) {
      context.commit('CLEAR_LISTINGS');
    },
    clearErrors (context) {
      context.commit('CLEAR_ERRORS');
    },
    postListing(context, listing) {
      return axios.post(`api/listings`, listing)
        .then(res => {
          context.commit('ADD_LISTINGS', res.data.listings);
          return (res);
        })
        .catch(e => {
          return (false);
        });
    },
    logCurrentUserIn (context, user) {
      context.commit('CLEAR_ERRORS');

        return axios.post(`api/session`, user )
          .then(res => {
            context.commit('ADD_CURRENT_USER', res.data);
          })
          .catch(e => {
            context.commit('SET_ERRORS', e.response.data[0]);
          });
      
    },
    signUserIn(context, user){
        context.commit('CLEAR_ERRORS');
        return axios.post(`api/users`,
          user
        )
          .then(res => {
            context.commit('ADD_CURRENT_USER', res.data);
            return true;
          })
          .catch(e => {
            context.commit('SET_ERRORS', e.response.data[0]);
            return false;
          });
      
    },
    logout (context) {
      return axios.delete(`api/session`)
        .then(res => {
          context.commit('LOGOUT');

        })
        .catch(e => {
    
          context.commit('SET_ERRORS', e.response.data[0]);
        });


      
    },
    getListings(context) {
      return axios.get(`api/listings`)
        .then(res => {
          context.commit('ADD_LISTINGS', res.data.listings)
        })
        .catch(e => {


        });
    },
    getUsers(context) {
      return axios.get(`api/users`)
        .then(res => {
          context.commit('ADD_USERS', res.data.users)
        })
        .catch(e => {

        });
    }
  }
  
});