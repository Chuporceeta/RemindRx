/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const firebaseConfig = {apiKey: "AIzaSyD076ENRDRauDUNj0bTZURJDlf26LmJmA0",
authDomain: "remindrx-1c8dd.firebaseapp.com",
projectId: "remindrx-1c8dd",
storageBucket: "remindrx-1c8dd.appspot.com",
messagingSenderId: "966406512713",
appId: "1:966406512713:web:1f46bc061b0249e17d5f98"};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;