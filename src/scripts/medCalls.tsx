import {auth, db} from './firebase-init.tsx';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { medInfo, Medication } from "../types/types";


export const addMed = async (medInfo: medInfo) => {
    try {
        const user = auth.currentUser;

        if (user) {
            const med = await addDoc(collection(db, "Users", user.uid, "Medications"), medInfo);
            return med.id;
        }
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
        }
        else{
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
        }
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deleteMedDB = async (medId: string) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await deleteDoc(doc(db, "Users", user.uid, "Medications", medId));
        }
    } catch (err: any) {
        throw new Error(err);
    }
};