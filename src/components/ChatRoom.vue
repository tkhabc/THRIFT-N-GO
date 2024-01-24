<template>
    <div class="chatroom">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" :class="{ 'message': true, 'mine': message.senderId === currentUserId, 'theirs': message.senderId !== currentUserId }">
            <div class="message-info">
                <span class="message-time">{{ new Date(message.timestamp.toDate()).toLocaleString() }}</span>
                <span class="message-username">{{ message.username }}</span>
                <div class="message-text">{{ message.text }}</div>
            </div>
        </div>
      </div>
      <div class="message-input">
        <input v-model="newMessage" @keyup.enter="sendMessageForChatRoom" placeholder="Type a message...">
        <button @click="sendMessageForChatRoom">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { getUserById, sendMessage, sendMessage as sendChatMessage} from '@/firebase/chatService'
  import { ref, onMounted, computed } from 'vue'
  import { db, auth } from '@/firebase/firebaseInit'
  import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'

  
  export default {
    props: {
      chatroomId: String
    },
    setup(props) {
      const messages = ref([]);
      const newMessage = ref('');
      const messagesRef = collection(db, 'messages');
      const currentUserId = computed(() => auth.currentUser?.uid);
  
      const loadMessages = async () => {
        const q = query(messagesRef, where('chatroomId', '==', props.chatroomId), orderBy('timestamp', 'asc')); // Sorting by timestamp
        onSnapshot(q, async (snapshot) => {
            const messagePromises = snapshot.docs.map(async doc => {
            const data = doc.data();
            const username = await getUserById(data.senderId);
            return { id: doc.id, username, ...data };
            });
            messages.value = await Promise.all(messagePromises);
        });
        };
  
    //   const sendMessage = () => {
    //     if (newMessage.value.trim() !== '') {
    //       sendMessage(props.chatroomId, currentUserId, newMessage.value);
    //       newMessage.value = '';
    //     }
    //   };
      onMounted(loadMessages);
      return { messages, newMessage, sendMessage };
    },

    methods: {
    sendMessageForChatRoom() {
    const currentUserId = auth.currentUser.uid;
      const message = this.newMessage.trim();
      if (message) {
        sendChatMessage(this.chatroomId, currentUserId, message);
        this.newMessage = '';
      }
    },
  },
  };
  </script>
  
  <style scoped>
  .chatroom {
    /* Your styles for the chatroom layout */
  }
  
  .messages {
    /* Style for the messages container */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .message {
    /* General style for each message */
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
  }
  
  .message-username {
    /* Style for displaying the username */
    font-weight: bold;
  }
  
  .mine {
  /* Styles for Messages Sent by Current User */
  align-self: flex-end;
  background-color: #daf8cb;
    }

    .theirs {
  /* Styles for Messages Received */
  align-self: flex-start;
  background-color: #f0f0f0;
}

    .message-time {
    /* Style for Date-Time Display */
    display: block;
    font-size: 0.8em;
    margin-top: 5px;
    text-align: right;
    opacity: 0.7;
}

    .message-info {
    /* Container for Text and Time */
    }

    .message-text {
    /* Style for Message Text */
    }
    
  .message-input {
    /* Style for the message input area */
    display: flex;
    padding: 10px;
  }
  
  .message-input input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
  }
  
  .message-input button {
    padding: 10px 20px;
    border-radius: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  