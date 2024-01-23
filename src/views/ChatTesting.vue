<template>
  <div class="chat-container">
    <div class="chat-window">
      <div v-for="message in messages" :key="message.id" class="message" :class="{ 'my-message': message.author === 'You' }">
        <span class="message-author">{{ message.author }}</span>
        <div class="message-content">
          {{ message.content }}
          <span class="message-timestamp">{{ message.timestamp }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="file" id="file-input" ref="fileInput" style="display: none" @change="attachFile" />
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Enter your message here" class="message-input" />

      <button @click="startRecording" :class="{ 'voice-recording-active': isRecording }" class="voice-recorder-button">
        <img :src="require('@/assets/microphone.png')" alt="Record" />
      </button>
      
      <label class="attach-file-icon">
        <img :src="require('@/assets/AttachFile.png')" alt="Attach" />
        <input type="file" @change="attachFile" class="file-input" />
      </label>

      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [
        { id: 1, author: 'Annie Tan', content: 'Hi Jane! The reference book is still available.', timestamp: '10:15 AM' },
        { id: 2, author: 'You', content: 'That’s great! Can I come collect it on this Saturday, around 3PM at your place?', timestamp: '10:30 AM' },
        // Add more messages here
      ],
      nextMessageId: 3,
      isRecording: false,
      attachedFiles: []
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') {
        return;
      }
      const message = {
        id: this.nextMessageId++,
        author: 'You',
        content: this.newMessage,
        // Attachments could be sent here
        // e.g., attachments: this.attachedFiles
      };
      this.messages.push(message);
      this.newMessage = ''; // Clear the input after sending
      // Optionally clear attachments after sending
      // this.attachedFiles = [];
    },
    startRecording() {
      // Placeholder function for starting/stopping recording
      this.isRecording = !this.isRecording;
      if (this.isRecording) {
        // Implement actual recording start logic here
      } else {
        // Implement actual recording stop and save logic here
      }
    },
    attachFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.attachedFiles.push(file);
        // Implement file upload logic here or add to message payload
        event.target.value = null; // Clear the input
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  height: 90vh;
  margin: 0 auto;
  background-color: #ffffff;
}

.chat-window {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
  background: #f9f9f9;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
}

.my-message {
  align-items: flex-end;
}

.message-author {
  font-weight: bold;
  margin-bottom: 4px;
}

.message-content {
  max-width: 75%;
  padding: 10px;
  border-radius: 18px;
  line-height: 1.4;
  font-size: 1rem;
  background-color: #e7e7e7;
  text-align: left;
}
.message-timestamp {
  display: block;
  text-align: right;
  color: #999999;
  font-size: 0.75rem;
  margin-top: 5px;
}

.my-message .message-content {
  background-color: #1A6757;
  color: white;
  padding: 10px;
  border-radius: 18px;
  line-height: 1.4;
  font-size: 1rem;
  white-space: normal; /* This allows text to wrap */
  word-wrap: break-word; /* Breaks the word to prevent overflow */
  text-align: left;
  max-width: 75%; /* Adjust if necessary to fit your design */
  margin-bottom: 4px; /* Spacing between messages */
}

.my-message .message-timestamp {
  color: #dddddd; /* Lighter color for better contrast on dark background */
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
}

/* Styles for the icons and send button */
.send-button {
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #E0E0E0; /* Light grey background */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Adjustments for the send button to match the design */
.send-button {
  background-color: #1A6757; /* Theme color */
  color: white;
  padding: 10px 20px;
  border-radius: 20px; /* Rounded corners for the send button */
  margin-left: 10px; /* Space between the attach button and send button */
}

/* Style the input where the user types their message */
.message-input {
  flex-grow: 1;
  border: 2px solid #1A6757; /* Theme color border */
  border-radius: 20px;
  margin: 0 10px;
  padding: 10px;
  outline: none;
}

.file-input {
  display: none; /* Hide the default file input */
}

.voice-recorder-button img,
.attach-file-icon img {
  width: 24px; /* Example size, adjust as needed */
  height: 24px; /* Example size, adjust as needed */
}

.send-button {
  /* ... existing send button styles */
  position: relative; /* For positioning the file attachment icon */
}

@media (max-width: 400px) {
  .chat-container {
    max-width: 100%;
  }
}
</style>


  



<!-- <template>
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
   -->