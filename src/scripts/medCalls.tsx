import {app, auth, db} from './firebase-init.tsx';
import { collection, 
    doc,
     setDoc, 
     getDoc,
     getDocs, 
     Timestamp} from "firebase/firestore";
// import firebase from 'firebase/compat/app';
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

export const getMedsDB = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const snapshot = await getDocs(collection(db, "Users", user.uid, "Medications"));
            const res = snapshot.docs.map(doc => doc.data());
            console.log(res);
            // const res2 = Array.from(res) as Array<{name: string, dosage: string, startDate: Date, freq: string | number}>;
            return res;
        }
        else{
            return [];
        }
    } catch (err: any) {
        throw new Error(err);
    }
}
