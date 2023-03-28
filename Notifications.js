import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

class Notification {
    constructor() {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
            },

            onRegistrationError: function (err) {
                console.error(err.message, err);
            },
        });

        PushNotification.createChannel({
            channelId: "remainders",
            channelName: "Task remainders notifications",
            channelDescription: "Remainder for any tasks"
        },
            () => { },
        );

        PushNotification.getScheduledLocalNotifications(rn => {
            console.log("SN --", rn)
        })
    }
    scheduleNotification(date) {
        PushNotification.localNotificationScheduled({
            channelId:"Remainder",
            title:"Remainder",
            message: "You have set this remainder",
            date
        })
    }
}

export default new Notification()