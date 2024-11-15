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

export const editMed = async (medId: string, medInfo: medInfo) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const medRef = doc(db, "Users", user.uid, "Medications", medId);
            await updateDoc(medRef, medInfo);
        } else {
            console.log('Error: No user currently signed in');
        }
    } catch (err: any) {
        throw new Error(err.message || 'Failed to edit medication');
    }
};

export const getMedsDB = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const snapshot = await getDocs(collection(db, "Users", user.uid, "Medications"));
            const res: Medication[] = [];
            snapshot.forEach((doc) => {
                const time = new Date(`2024T${doc.data()["timeUTC"]}Z`).toTimeString().slice(0, 5);
                const date = new Date(`2024T${time}`);

                res.push({
                    id: doc.id,
                    name: doc.data()["name"],
                    dosage: doc.data()["dosage"],
                    time: time,
                    day: doc.data()["dayUTC"] + date.getDay() - date.getUTCDay(),
                    freq: doc.data()["freq"],
                    isTaken: doc.data()["isTaken"],
                } as Medication);
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