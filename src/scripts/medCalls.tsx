import {auth, db} from './firebase-init.tsx';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { medInfo, Medication } from "../types/types";


export const addMed = async (medInfo: medInfo) => {
    try {
        const user = auth.currentUser;

        if (user) {
            await addDoc(collection(db, "Users", user.uid, "Medications"), medInfo);
        } else
            console.log('Error: No user currently signed in');
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getMedsDB = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const snapshot = await getDocs(collection(db, "Users", user.uid, "Medications"));
            const res: Medication[] = [];
            snapshot.forEach((doc) => {
                res.push({id: doc.id, ...doc.data()} as Medication);
            });
            return res;
        } else {
            console.log('Error: No user currently signed in');
            return [];
        }
    } catch (err: any) {
        throw new Error(err);
    }
};

export const markAsTakenDB = async (medId: string) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, "Users", user.uid, "Medications", medId), {
                isTaken: true,
            });
        } else
            console.log('Error: No user currently signed in');
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deleteMedDB = async (medId: string) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await deleteDoc(doc(db, "Users", user.uid, "Medications", medId));
        } else
            console.log('Error: No user currently signed in');
    } catch (err: any) {
        throw new Error(err);
    }
};