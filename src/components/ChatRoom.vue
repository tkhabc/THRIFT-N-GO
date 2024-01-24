<template>
    <div class="chatroom">
      <div class="messages" ref="messagesContainer" >
        <div v-for="message in messages" :key="message.id" :class="{ 'message': true, 'mine': message.senderId === currentUserId, 'theirs': message.senderId !== currentUserId }">
            <div class="message-info">
                <span class="message-time, timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                <!-- <span class="message-time">{{ new Date(message.timestamp.toDate()).toLocaleString() }}</span> -->
                <div class="message-username">{{ message.username }}</div>
                <div class="message-text">{{ message.text }}</div>
            </div>
        </div>
      </div>
      <div class="message-input">
        <v-btn
        @click="$router.go(-1)"
        style="width: 60px; height: 50px; background-color: #1A6757" 
        class="ma-2"
        >
        <v-icon icon="mdi-arrow-left" size="25"> </v-icon>
        </v-btn>
        <input v-model="newMessage" @keyup.enter="sendMessageForChatRoom" placeholder="Type a message...">
        <v-btn class="ma-2" style="width: 90px; height: 50px" @click="sendMessageForChatRoom">Send</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { getUserById, sendMessage, sendMessage as sendChatMessage} from '@/firebase/chatService'
  import { ref, onMounted, computed, nextTick } from 'vue'
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
      const messagesContainer = ref(null); // Reference to the messages container
      //const currentUserId = computed(() => auth.currentUser?.uid);
  

      const scrollToBottom = () => {
        nextTick(() => {
            console.log("Attempting to scroll to bottom"); 
            if (messagesContainer.value) {
                console.log("Scroll Height:", messagesContainer.value.scrollHeight); // Log scrollHeight
                console.log("Current Scroll:", messagesContainer.value.scrollTop); // Log current scroll position
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
            }
            else {
                console.log("messagesContainer ref is not attached to a DOM element");
                }
        });
        };

      const loadMessages = async () => {
        const q = query(messagesRef, where('chatroomId', '==', props.chatroomId), orderBy('timestamp', 'asc')); // Sorting by timestamp
        onSnapshot(q, async (snapshot) => {
            const messagePromises = snapshot.docs.map(async doc => {
            const data = doc.data();
            const username = await getUserById(data.senderId);
            return { id: doc.id, username, ...data };
            });
            messages.value = await Promise.all(messagePromises);
            nextTick(() => {
                nextTick(() => {
                    scrollToBottom();
                });
            });
        });
        };

      onMounted(loadMessages);
      return { messages, newMessage, sendMessage,  messagesContainer };
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
    formatTimestamp(timestamp) {
        const date = new Date(timestamp.toDate()); // Convert Firestore timestamp to JavaScript Date
        // Example formatting: 'Jan 1, 2020, 12:00 PM'
        return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    });
    }
  },
  };
  </script>
  
  <style scoped>
 .message-time {
  font-size: 0.75em; /* Reduced font size for timestamp */
  color: #999;
  display: block;
  margin-top: 5px;
  text-align: right;
  opacity: 0.7;
}
.chatroom {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Use the full height of the viewport */
}
  
.messages {
  overflow-y: auto;
  flex-grow: 1; /* Allow messages container to grow and fill available space */
  padding-bottom: 70px; /* Adjust based on the height of your message input */
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
  align-self: flex-end;
  background-color: #daf8cb;
}

.theirs {
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
    display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #f8f8f8;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}
  
  .message-input input {
    flex-grow: 1;
  padding: 10px 15px;
  border-radius: 25px;
  border: 2px solid #ddd;
  margin-right: 10px;
  }
  
  .message-input button {
    padding: 10px 20px;
    border-radius: 25px;
    background-color: #1A6757;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
  </style>
  