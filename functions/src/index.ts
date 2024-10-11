/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp, getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";



// Initialize Firebase
const app = initializeApp();
const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "127.0.0.1", 5001);