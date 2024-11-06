import admin = require("firebase-admin");
import { getFirestore, Filter } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

exports.sendNotifications = onSchedule("every minute", async () => {
    const day = new Date().getUTCDay();
    const time = new Date().toISOString().slice(11, 16);
    const users = await getFirestore().collection("Users").get();
    console.log (`day: ${day}, time: ${time}`);
    for (const user of users.docs) {
        const message = {
            notification: {
                "title":"Time for your medications!",
                "body":""
            },
            tokens: user.data()["FCMTokens"],
        };
        console.log(user.id, " => ", user.data());
        const meds = await getFirestore().collection("Users").doc(user.id).collection("Medications")
            .where("timeUTC", "==", time)
            .where(Filter.or(
                Filter.where("freq", "==", "daily"),
                Filter.where("day", "==", day)
            )).get();
        meds.forEach(med => {
            const data = med.data();
            message.notification.body += `Time to take ${data["name"]} - ${data["dosage"]}\n`;
        });
        if (message.notification.body !== "" && message.tokens.length > 0)
            getMessaging().sendEachForMulticast(message)
                .then(response => {
                    console.log(response.successCount + ' messages were sent successfully');
                });
    }
});

