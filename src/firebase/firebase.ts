import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebase-config.ts';
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export {app, auth, db};