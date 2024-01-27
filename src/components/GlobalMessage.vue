<template>
    <div v-if="isMessageVisible" class="message-overlay">
      <div class="message-box">
        <p>{{ message }}</p>
        <v-btn color="primary" @click="closeMessage">OK</v-btn>
      </div>
    </div>
  </template>
  
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const isMessageVisible = computed(() => store.state.isMessageVisible);
      const message = computed(() => store.state.message);
  
      const closeMessage = () => {
        store.commit('setIsMessageVisible', false);
      };
  
      return { isMessageVisible, message, closeMessage };
    }
  }
  </script>
  
  <style>
  .message-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .message-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  