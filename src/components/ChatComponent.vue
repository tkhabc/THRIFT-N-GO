<template>
    <div class="chat-container">
      <div v-if="user">
        <div class="messages">
          <div v-for="message in messages" :key="message.id" class="message">
            <span>{{ message.userEmail }}:</span> {{ message.text }}
          </div>
        </div>
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
      </div>
      <div v-else>
        <p>Please log in to view messages.</p>
      </div>
    </div>
  </template>
  
  
<script>
import { ref, onMounted } from 'vue';
import { auth, db, collection } from '@/firebase/firebaseInit';
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
      onSnapshot(q, (snapshot) => {
        messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    });

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !user.value) return;

      try {
        await addDoc(collection(db, 'messages'), {
          userId: user.value.uid, // Use user's UID as identifier
          userEmail: user.value.email, // Optionally use email
          text: newMessage.value,
          timestamp: serverTimestamp(),
        });

        newMessage.value = '';
      } catch (error) {
        console.error("Error sending message: ", error);
        // Handle error
      }
    };

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