<template>hhhhhh
  <div class="chat-container">
    <div v-if="user">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message">
          <span>{{ message.username || 'Unknown User' }}:</span> {{ message.text }}
        </div>
      </div>
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type Your Message...">
    </div>
    <div v-else>
      <p>Please log in to view messages.</p>
    </div>
  </div>
</template>
  
  
<script>
import { ref, onMounted } from 'vue';
import { auth, db, collection, doc, getDoc } from '@/firebase/firebaseInit';
import { addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default {
  setup() {
    const newMessage = ref('');
    const messages = ref([]);
    const user = ref(null);

    onMounted(() => {
      // Check if user is logged in
      auth.onAuthStateChanged((loggedInUser) => {
        if (loggedInUser) {
          user.value = loggedInUser;
        } else {
          user.value = null;
          // Handle user not logged in
        }
      });

      // Load messages from Firestore
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      onSnapshot(q, async (snapshot) => {
        const messagesWithUsernames = [];
        for (const doc of snapshot.docs) {
          const messageData = doc.data();
          const username = await fetchUsername(messageData.userId);
          messagesWithUsernames.push({ id: doc.id, username, ...messageData });
        }
        messages.value = messagesWithUsernames;
      });
    });

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !user.value) return;

      try {
        await addDoc(collection(db, 'messages'), {
          userId: user.value.uid, // Use user's UID as identifier
         // userEmail: user.value.email, // Optionally use email
          text: newMessage.value,
          timestamp: serverTimestamp(),
        });

        newMessage.value = '';
      } catch (error) {
        console.error("Error sending message: ", error);
        // Handle error
      }
    };

     // Function to fetch username from Firestore
     async function fetchUsername(userId) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data().username : 'Unknown User';
}


    return { newMessage, messages, user, sendMessage };
  },
};
</script>

  
<style scoped>
.chat-container {
/* Add your styles here */
}
.messages {
/* Add your styles here */
}
.message {
/* Add your styles here */
}
</style>