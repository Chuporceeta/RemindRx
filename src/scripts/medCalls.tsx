import {auth, db} from './firebase-init.tsx';
import {collection, addDoc} from "firebase/firestore";

type medInfo = {
    name: string,
    dosage: string,
    time: string,
    day: string | number,
    freq: string | number,
}

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

