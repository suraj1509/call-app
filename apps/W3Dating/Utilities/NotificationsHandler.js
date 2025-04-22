import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

const createNotificationChannel = () => {
  if (Platform.OS === "android") {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`🔵 Notification channel created: ${created}`),
    );
  }
};

const useNotificationHandler = () => {
  useEffect(() => {
    createNotificationChannel();

    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log("✅ Foreground Notification Received:", remoteMessage);
      PushNotification.localNotification({
        channelId: "default-channel-id",
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
      });
    });

    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("✅ Notification Opened from Background:", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("✅ Notification Opened from Killed State:", remoteMessage);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
};

export default useNotificationHandler;
