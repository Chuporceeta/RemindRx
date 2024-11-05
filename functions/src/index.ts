import admin = require("firebase-admin");
import { getFirestore, Filter } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

exports.sendNotifications = onSchedule("every minute", async () => {
    const messages: any[] = [];
    const day = new Date().getDay();
    const time = new Date().toTimeString().slice(0, 5);
    const users = await getFirestore().collection("Users").get();
    users.forEach( async (user) => {
        console.log(user.id, " => ", user.data());
        const tokens = user.data["FCMTokens"];
        const message = {
            notification: {
                "title":"Time for your medications!",
                "body":""
            },
            tokens: tokens,
        };
        const meds = await getFirestore().collection("Users").doc(user.id).collection("Medications")
            .where("time", "==", time)
            .where(Filter.or(
                Filter.where("freq", "==", "daily"),
                Filter.where("day", "==", day)
            )).get();
        meds.forEach(med => {
            const data = med.data();
            message.notification.body += `Time to take ${data["name"]} - ${data["dosage"]}\n`;
        });
        messages.push(message);
    });
    getMessaging().sendEach(messages)
        .then(response => {
            console.log(response.successCount + ' messages were sent successfully');
        });
});

