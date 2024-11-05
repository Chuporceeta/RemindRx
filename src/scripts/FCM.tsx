import {db, auth, messaging} from "./firebase-init.tsx";
import {vapidKey} from "../../public/firebase-config.ts";
import {getToken} from "firebase/messaging";
import {doc, updateDoc, arrayUnion} from "firebase/firestore";

export const getFCMToken = () => {
    // Get permission to send notifications from browser
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission: string) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get FCM Token
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register(
                        import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
                        { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
                    )
                    .then(registration => {
                        getToken(messaging, {
                            vapidKey: vapidKey,
                            serviceWorkerRegistration: registration
                        }).then(async (currentToken) => {
                            if (currentToken) {
                                // Store FCM token in database
                                console.log(currentToken);
                                const uid: string | undefined = auth.currentUser?.uid;
                                if (uid) {
                                    const user = doc(db, "Users", uid);
                                    await updateDoc(user, {
                                        FCMTokens: arrayUnion(currentToken)
                                    });
                                } else {
                                    console.log('Error getting current user');
                                }
                            } else {
                                console.log('No registration token available. Request permission to generate one.');
                            }
                        }).catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                    });
            }
        }
    });
}