<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Chat Rooms</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="white" v-if="isLoading"></v-progress-circular>
          </v-toolbar>
          <v-list v-if="!isLoading && chatrooms.length > 0">
            <v-list-item-group>
              <v-list-item v-for="chatroom in chatrooms" :key="chatroom.id" @click="goToChatroom(chatroom.id)" two-line>
                <v-list-item-avatar>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">{{ chatroom.participantName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ chatroom.lastMessage }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text>{{ chatroom.lastMessageTime }}</v-list-item-action-text>
              </v-list-item>
              <v-divider v-for="(item, i) in chatrooms" :key="`divider-${i}`" inset></v-divider>
            </v-list-item-group>
          </v-list>
          <v-subheader v-else-if="!isLoading">{{ chatrooms.length === 0 ? 'No chat rooms available' : 'Loading chat rooms...' }}</v-subheader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

.v-card-title {
  background-color: #1A6757; /* Your theme color */
  color: white;
}
.v-list-item--active {
  background-color: #EEEEEE; /* Highlight color for active chat rooms */
}

.v-card {
  border-radius: 16px; /* Rounded corners for the card */
}
.v-toolbar {
  border-radius: 16px 16px 0 0; /* Rounded corners for the toolbar */
}
.v-list-item {
  margin-bottom: 2px; /* Spacing between list items */
}
.v-divider {
  margin: 0; /* Remove default margin of divider */
}
</style>
  




<!-- <template>
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
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.chatroom-info {
  /* Styling for chatroom information */
}

.chatroom-participant {
  font-weight: bold;
}

.last-message {
  color: #666;
}

.chatroom-timestamp {
  color: #999;
  font-size: 0.8em;
}
</style> -->
  