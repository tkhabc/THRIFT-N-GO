<template>
    <div class="chatroom">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message" :class="{ 'mine': message.senderId === currentUserId }">
          <span>{{ message.text }}</span>
        </div>
      </div>
      <div class="message-input">
        <input v-model="newMessage" @keyup.enter="sendMessageForChatRoom" placeholder="Type a message...">
        <button @click="sendMessageForChatRoom">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db, auth } from '@/firebase/firebaseInit';
  import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore'
  import { sendMessage } from '@/firebase/chatService'
  import {sendMessage as sendChatMessage} from '@/firebase/chatService'

  
  export default {
    props: {
      chatroomId: String
    },
    setup(props) {
      const messages = ref([]);
      const newMessage = ref('');
      const messagesRef = collection(db, 'messages');
      const currentUserId = auth.currentUser.uid;
  
      const loadMessages = () => {
        const q = query(messagesRef, where('chatroomId', '==', props.chatroomId));
        onSnapshot(q, (snapshot) => {
          messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  
  <style>
  /* Add your styles here */
  </style>
  