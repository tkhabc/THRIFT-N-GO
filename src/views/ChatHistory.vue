<template>
    <div class="chat-history">
      <div class="title-container">
        <h1 class="chat-history-title">Chat History</h1>
      </div>
      <div class="search-container">
        <input type="text" placeholder="Search messages, people" class="search-bar"/>
      </div>
      <div class="chat-list">
        <div 
          v-for="(chat, index) in chats" 
          :key="chat.id" 
          class="chat-item" 
          @click="index === 0 ? navigateToChat(chat.id) : null"
        >
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-preview">{{ chat.preview }}</div>
          </div>
          <div class="chat-timestamp">{{ chat.timestamp }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        chats: [
          {
            id: 1,
            name: 'Annie Tan',
            preview: 'That’s great! Can I come collect it...',
            timestamp: '10:30 AM',
          },
          {
            id: 2,
            name: 'Jennifer Lawrence',
            preview: 'Hi there! Is this still available?',
            timestamp: '08:45 PM',
          },
          {
            id: 3,
            name: 'Olivia Foster',
            preview: 'See you at the pick-up!',
            timestamp: 'Yesterday',
          },
          {
            id: 4,
            name: 'Jackson Adams',
            preview: 'Can you pick up the item at USM...',
            timestamp: 'Yesterday',
          },
          {
            id: 5,
            name: 'Ethan Sullivan',
            preview: 'The item is still available.',
            timestamp: 'Yesterday',
          },
        ],
        hover: null, // To track hover state
        };
    },
    methods: {
        navigateToChat(chatId) {
        // This assumes you have a named route 'Chat' set up in your router configuration.
        this.$router.push({ name: 'Chat', params: { id: chatId } });
        },
    },
  };
  </script>
  
  <style scoped>
.chat-history {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 400px;
  margin: auto;
  background: #fff;
}

.title-container {
  padding: 10px 16px;
  text-align: center;
}

.chat-history-title {
  margin: 0;
  color: #1A6757;
  font-size: 1.3rem;
}

.search-container {
  padding: 10px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chat-list {
  overflow-y: auto;
  max-height: 500px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ececec;
  cursor: pointer;
}

.chat-item:hover, .chat-item.hovered {
  background-color: #f2f2f2;
}

.chat-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.chat-name {
  font-weight: bold;
  color: #1A6757;
}

.chat-preview {
  color: #666;
  font-size: 0.9rem;
}

.chat-timestamp {
  color: #999;
  font-size: 0.8rem;
  margin-left: auto;
}
</style>
  