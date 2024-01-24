// chatService.js
import { db } from '@/firebase/firebaseInit'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

const chatroomsRef = collection(db, 'chatrooms');
const messagesRef = collection(db, 'messages');

export const createOrGetChatroom = async (sellerId, buyerId) => {
  const q = query(chatroomsRef, where('userIds', 'array-contains', sellerId));
  const querySnapshot = await getDocs(q);
  let chatroom = querySnapshot.docs.find(doc => doc.data().userIds.includes(buyerId));

  if (!chatroom) {
    // Create new chatroom
    const chatroomData = {
      userIds: [sellerId, buyerId],
      lastMessage: '',
      lastMessageTime: null
    };
    console.log('Creating new chatroom with data:', chatroomData);
    
    chatroom = await addDoc(chatroomsRef, chatroomData);
  }

  return chatroom.id;
};

export const sendMessage = async (chatroomId, senderId, text) => {
  const messageData = {
    chatroomId,
    senderId,
    text,
    timestamp: new Date()
  };
  await addDoc(messagesRef, messageData);
};
