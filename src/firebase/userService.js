import { db } from './firebaseInit';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const UserServices = {
  // Fetch or create profile data by user ID
  getUserData: async (userId) => {
    const profileRef = doc(db, 'profiles', userId);
    try {
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        return profileSnap.data();
      } else {
        // If profile does not exist, create a new one with default values
        const defaultProfile = {
          profileCompleted: false,
        };
        
        await setDoc(profileRef, defaultProfile);
        return defaultProfile;
      }
    } catch (error) {
      console.error('Error handling profile data:', error);
      throw error;
    }
  },

  isProfileComplete: async (userId) => {
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    return profileSnap.exists() && profileSnap.data().profileComplete;
},

  updateUserData: async (userId, profileData) => {
    try {
      const profileRef = doc(db, 'profiles', userId);
      await updateDoc(profileRef, profileData);
      return { status: 'success', message: 'Profile data updated successfully' };
    } catch (error) {
      console.error('Error updating profile data:', error);
      return { status: 'error', message: error.message };
    }
  }
};

export default UserServices;
