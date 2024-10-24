import { auth, db } from './firebase-init.tsx';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator  } from "firebase/auth";

export const createUser = async ({
    firstName,
    lastName,
    dateOfBirth,
    phone,
    email,
    password
}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "Users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            phone: phone,
            FCMTokens: [],
        });

        return user;
    } catch (error: any) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

export const logInUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        return userCredential.user;
    } catch (error: any) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};
