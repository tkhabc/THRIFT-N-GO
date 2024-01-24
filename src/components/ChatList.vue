<template>
    <div class="chatlist">
      <div v-for="chatroom in chatrooms" :key="chatroom.id" @click="goToChatroom(chatroom.id)" class="chatroom-entry">
        <div class="chatroom-info">
          <span class="chatroom-participant">{{ getParticipantName(chatroom.userIds) }}</span>
          <span class="last-message">{{ chatroom.lastMessage }}</span>
        </div>
        <div class="chatroom-timestamp">{{ chatroom.lastMessageTime }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { db, auth } from '@/firebase/firebaseInit'
  import { collection, query, where, onSnapshot } from 'firebase/firestore'
  import router from '@/router/index';
  
  export default {
    setup() {
      const chatrooms = ref([]);
      const chatroomsRef = collection(db, 'chatrooms');
      const currentUserId = auth.currentUser.uid;
  
      const loadChatrooms = () => {
        const q = query(chatroomsRef, where('userIds', 'array-contains', currentUserId));
        onSnapshot(q, (snapshot) => {
          chatrooms.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
      };
  
      const goToChatroom = (chatroomId) => {
        router.push({ name: 'Chatroom', params: { chatroomId } });
      };
  
      const getParticipantName = (userIds) => {
        // Implement logic to retrieve the name of the other participant (not the current user)
        // This might involve a query to the 'users' collection in Firestore
        return 'Participant Name'; // Placeholder, replace with actual logic
      };
  
      onMounted(loadChatrooms);
  
      return { chatrooms, goToChatroom, getParticipantName };
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  