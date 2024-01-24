<template>
  <div class="chatlist">
    <div v-if="isLoading" class="loading">Loading chatrooms...</div> 
    <div v-for="chatroom in chatrooms" :key="chatroom.id" @click="goToChatroom(chatroom.id)" class="chatroom-entry" v-else>
      <div class="chatroom-info">
        <span class="chatroom-participant">{{ chatroom.participantName }}</span>
        <span class="last-message">{{ chatroom.lastMessage }}</span>
      </div>
      <div class="chatroom-timestamp">{{ chatroom.lastMessageTime }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase/firebaseInit';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import router from '@/router/index';
import { getUserById } from '@/firebase/chatService'; // Make sure this function exists

export default {
setup() {
  const isLoading = ref(true);
  const chatrooms = ref([]);
  const chatroomsRef = collection(db, 'chatrooms');
  let currentUserId = auth.currentUser?.uid; // Using optional chaining

  // Fetch participant names for each chatroom
  const fetchParticipantNames = async (chatroomsSnapshot) => {
    return Promise.all(chatroomsSnapshot.docs.map(async (doc) => {
      const chatroomData = doc.data();
      const otherUserId = chatroomData.userIds.find(id => id !== currentUserId);
      const participantName = await getUserById(otherUserId); // Fetch the participant's name
      const lastMessage = chatroomData.lastMessageText;
      return {
        id: doc.id,
        participantName,
        lastMessage,
        ...chatroomData
      };
    }));
  };

  const loadChatrooms = async () => {
    isLoading.value = true;
    const q = query(chatroomsRef, where('userIds', 'array-contains', currentUserId));
    onSnapshot(q, async (snapshot) => {
      const chatroomsWithNames = await fetchParticipantNames(snapshot);
      chatrooms.value = chatroomsWithNames;
    });
    isLoading.value = false;
  };

  onMounted(loadChatrooms);

  const goToChatroom = (chatroomId) => {
    router.push({ name: 'ChatRoom', params: { chatroomId } });
  };

  return { chatrooms, goToChatroom, isLoading };
}

};
</script>
  
  <style scoped>
  .chatlist {
  /* Styling for the chat list container */
}

.chatroom-entry {
  /* Styling for each chatroom entry */
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.chatroom-info {
  /* Styling for chatroom information */
}

.chatroom-participant {
  /* Styling for participant name */
  font-weight: bold;
}

.last-message {
  /* Styling for the last message preview */
  color: #666;
}

.chatroom-timestamp {
  /* Styling for the timestamp */
  color: #999;
  font-size: 0.8em;
}
  </style>
  