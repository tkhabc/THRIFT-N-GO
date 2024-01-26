<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Your ChatRooms</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="white" v-if="isLoading"></v-progress-circular>
          </v-toolbar>
          <v-text-field
            v-model="searchQuery"
            label="Search Chat Rooms"
            single-line
            hide-details
          ></v-text-field>
          <v-list v-if="!isLoading && chatrooms.length > 0">
            <v-list-item-group>
              <v-list-item v-for="chatroom in chatrooms" :key="chatroom.id" @click="goToChatroom(chatroom.id)" two-line>

                <!-- <v-list-item-avatar v-if="chatroom.participantAvatar">
                <img :src="chatroom.participantAvatar" alt="Profile Picture" >
                </v-list-item-avatar> -->
                <v-badge
                :content="chatroom.unreadCount"
                color="red"
                overlap
                class="notification-badge"
                v-if="chatroom.unreadCount > 0">
                </v-badge>
                <v-list-item-avatar >
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle class="font-weight-bold">{{ chatroom.participantName }}</v-list-item-subtitle>
                  <v-list-item-action-text>{{ formatChatroomTime(chatroom.lastMessageTime) }}</v-list-item-action-text>
                  
                  <v-list-item-title class="last-message">{{ chatroom.lastMessage }}</v-list-item-title>
                </v-list-item-content>
                
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
import { debounce } from 'lodash';
import { ref, onMounted, computed, watch } from 'vue';
import { db, auth } from '@/firebase/firebaseInit';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import router from '@/router/index';
import { getUserById } from '@/firebase/chatService'; // Make sure this function exists
import { formatDistanceToNow } from 'date-fns';


export default {
setup() {
  const isLoading = ref(true);
  const chatrooms = ref([]);
  const chatroomsRef = collection(db, 'chatrooms');
  let currentUserId = auth.currentUser?.uid; // Using optional chaining
  const searchQuery = ref('');

  // Fetch participant names for each chatroom
  const fetchParticipantNames = async (doc) => {
  const chatroomData = doc.data();
  const otherUserId = chatroomData.userIds.find(id => id !== currentUserId);
  const participantData = await getUserById(otherUserId); // Fetch the participant's name

  return {
    participantName: participantData.username,
    participantAvatar: participantData.profilePictureUrl,
    lastMessage: chatroomData.lastMessage,
    lastMessageTime: chatroomData.lastMessageTime
  };
};

  const filteredChatrooms = computed(() => {
      if (!searchQuery.value) return chatrooms.value;
      return chatrooms.value.filter(chatroom =>
        chatroom.participantName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        chatroom.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    watch(searchQuery, debounce(() => {
      loadChatrooms();
    }, 300));

const loadChatrooms = async () => {
  isLoading.value = true;
  const q = query(chatroomsRef, where('userIds', 'array-contains', currentUserId));
  onSnapshot(q, async (snapshot) => {
    const chatroomsWithNamesPromises = snapshot.docs.map(async (doc) => {
      const chatroomInfo = await fetchParticipantNames(doc);

      // Query to count unread messages
      const unreadQuery = query(
        collection(db, 'messages'), 
        where('chatroomId', '==', doc.id), 
        where('read', '==', false),
        where('senderId', '!=', currentUserId)
        );
      const unreadSnapshot = await getDocs(unreadQuery);

      return {
        id: doc.id,
        ...chatroomInfo,
        unreadCount: unreadSnapshot.docs.length // Add unreadCount property
      };
    });

    chatrooms.value = await Promise.all(chatroomsWithNamesPromises);
    isLoading.value = false;
  });
};


  onMounted(loadChatrooms);

  const goToChatroom = (chatroomId) => {
    router.push({ name: 'ChatRoom', params: { chatroomId } });
  };

  
// const formatChatroomTime = (timestamp) => {
//   return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
// };

  return { chatrooms, goToChatroom, isLoading, searchQuery, filteredChatrooms };

  
},
methods: {
  formatChatroomTime(timestamp) {
    if (!timestamp) {
      // Return a default string or handle the case when timestamp is not available
      return 'No date available';
    }
    try {
      return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid date';
    }
  },
    // ... other methods ...
  },
};
</script>
  
<style scoped>

.v-list-item-avatar img {
  width: 100%;
  height: auto;
  border-radius: 50%; /* Makes the image circular */
}
.notification-badge {
  animation: pulse 1s infinite;
  /* You can adjust the color and size as per your design */
  --v-badge-background-color: red !important;
  --v-badge-color: white !important;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.last-message {
  font-size: 1.2em; /* Adjust the size as needed */
  color: #1A6757;
  font-weight: bold;
}

.chatroom-entry {
  /* Styling for each chatroom entry */
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
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
