import {app, auth} from '../firebase/firebase.ts';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};
const logInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};
export {createUser, logInUser };