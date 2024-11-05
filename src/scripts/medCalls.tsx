
import {auth, db} from './firebase-init.tsx';
import {getDocs, collection, addDoc} from "firebase/firestore";
import { medInfo, Medication } from "../types/types";


export const addMed = async (medInfo: medInfo) => {
    try {
        const user = auth.currentUser;

        if (user) {
            await addDoc(collection(db, "Users", user.uid, "Medications"), medInfo);
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
                res.push(doc.data() as Medication);
            });
            return res;
        }
        else{
            return [];
        }
    } catch (err: any) {
        throw new Error(err);
    }
}
