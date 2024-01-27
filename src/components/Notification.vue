<template>
    <div class="custom-notification">
      <div class="notification-message">{{ message }}</div>
      <button @click="closeNotification">OK</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
    },
    methods: {
      closeNotification() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-notification {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  
  .notification-message {
    font-weight: bold;
    margin-bottom: 5px;
  }
  </style>
  