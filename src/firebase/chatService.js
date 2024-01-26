// chatService.js
import { db } from '@/firebase/firebaseInit'
import { collection, query, where, getDocs, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

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
      lastMessageTime: '',
    };
    console.log('Creating new chatroom with data:', chatroomData);

    chatroom = await addDoc(chatroomsRef, chatroomData);
  }

  return chatroom.id;
};

export const sendMessage = async (chatroomId, senderId, text) => {
  const timestamp = new Date();
  const messageData = {
    chatroomId,
    senderId,
    text,
    timestamp,
    read: false
  };

  await addDoc(messagesRef, messageData);

  const chatroomDocRef = doc(db, 'chatrooms', chatroomId);
  await updateDoc(chatroomDocRef, {
    lastMessage: text,
    lastMessageTime: timestamp
  });
};

export const getUserById = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()){
        const userData = docSnap.data();
        return {
          username: userData.username,
          profilePictureUrl: userData.profilePictureUrl
        };
       } else {
        console.log('No such user found!');
        return { username:'Unknown User',  profilePictureUrl: 'default-avatar.png'}; // Or handle as you see fit
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return { username: 'Error', profilePictureUrl: 'default-avatar.png' };
    }
  };