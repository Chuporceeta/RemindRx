import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {firebaseConfig, vapidKey} from "../firebase-config.ts";
import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import {getFirestore, doc, updateDoc, arrayUnion, connectFirestoreEmulator } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

console.log('Requesting permission...');
Notification.requestPermission().then((permission: string) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(messaging, {vapidKey}).then(async (currentToken) => {
            if (currentToken) {
                console.log(currentToken);
                const uid: string = 'test'; // TODO: get uid from Firebase Auth
                const user = doc(db, "Users", uid);
                await updateDoc(user, {
                    FCMTokens: arrayUnion(currentToken)
                });
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
    }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
