<template>
    <div class="chat-container">
      <div class="chat-window">
        <div v-for="message in messages" :key="message.id" class="message" :class="{ 'my-message': message.author === 'You' }">
          <span class="message-author">{{ message.author }}:</span>
          <span class="message-content">{{ message.content }}</span>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: [],
        nextMessageId: 0
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        const message = {
          id: this.nextMessageId++,
          author: 'You', // This should be dynamically set based on the authenticated user
          content: this.newMessage
        };
  
        this.messages.push(message);
        this.newMessage = ''; // Clear the input after sending
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height: 80vh; /* Adjust the chat container height as needed */
    margin: 0 auto; /* Center the chat container */
    background-color: #ffffff;
  }
  
  .chat-window {
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 16px;
    background-color: #e7e7e7;
    max-width: 80%;
  }
  
  .my-message {
    margin-left: auto;
    background-color: #43C3A0; /* Theme color for the user's messages */
    color: white; /* Text color for the user's messages */
  }
  
  .message-author {
    font-weight: bold;
    color: #1A6757;
  }
  
  .message-content {
    display: block;
    margin-left: 5px;
    color: #333;
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    background: #fff;
  }
  
  .chat-input input {
    flex-grow: 1;
    border: 2px solid #1A6757;
    border-radius: 20px;
    padding: 8px 15px;
    margin-right: 10px;
    outline: none;
  }
  
  .chat-input input:focus {
    border-color: #43C3A0;
  }
  
  .chat-input button {
    padding: 8px 20px;
    background-color: #1A6757;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .chat-input button:hover {
    background-color: #43C3A0;
  }
  
  @media (max-width: 400px) {
    .chat-container {
      max-width: 100%;
      border-radius: 0;
    }
  }
  </style>
  