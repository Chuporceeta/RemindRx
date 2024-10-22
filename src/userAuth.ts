import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp();
const auth = getAuth(app);
const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  };
  const logInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };
  export { createUser, logInUser};