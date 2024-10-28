import {app, auth, db} from './firebase-init.tsx';
import { collection, 
    doc,
     setDoc, 
     getDoc,
     getDocs, 
     Timestamp} from "firebase/firestore";
// import firebase from 'firebase/compat/app';

// medName: string
// dosage: string
// startDate: Date converted intro string
// freq: string | number

// const firestoreInstance = firebase.firestore();

function makeDoc(name: string, dosage: string, startDate: Date, freq: string | number) {
    return {
        name: name,
        dosage: dosage,
        startDate: Timestamp.fromDate(startDate),
        freq: freq
    };
}

export const addMed = async (medName: string, dosage: string, startDate: Date, freq: string | number) => {
    try {
        const newDoc = makeDoc(medName, dosage, startDate, freq);
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "Users", user.uid, "Medications", medName), newDoc);
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
