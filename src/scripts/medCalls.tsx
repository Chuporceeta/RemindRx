import {app, auth, db} from './firebase-init.tsx';
import { collection, doc , setDoc, Timestamp} from "firebase/firestore";

// medName: string
// dosage: string
// startDate: Date converted intro string
// freq: string | number
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
            console.log("Adding medication to user's data...");
            await setDoc(doc(db, "UsersMedData", user.uid, "Medications", medName), newDoc);
        }
    } catch (err: any) {
        throw new Error(err);
    }
};

